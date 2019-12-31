import { UseGuards, UnauthorizedException } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Parent
} from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CensusService } from '../census/census.service'
import { FileService } from '../files/files.service'
import { PollInput, VotePollInput } from './poll.input'
import { PollsService } from './poll.service'
import { Poll } from './poll.type'
import { Census } from '../census/census.type'
import { PollResults } from './electoral-process.results.type'
import { PollResultsService } from './poll.results.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { User } from '../users/users.type'
import { mongoose } from '@typegoose/typegoose'
import { PollVoteService } from './poll.votes.service'

@Resolver(() => Poll)
@UseGuards(GqlAuthGuard)
export class PollResolver {
  constructor (
    private readonly pollsService: PollsService,
    private readonly filesService: FileService,
    private readonly censusService: CensusService,
    private readonly pollResultsService: PollResultsService,
    private readonly pollVoteService: PollVoteService
  ) {}

  @Query(() => [Poll])
  async polls () {
    return this.pollsService.findAll()
  }

  @Query(() => Poll)
  async poll (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pollsService.findById(id)
  }

  @ResolveProperty(() => [Census])
  async censuses (@Parent() poll: Poll) {
    return this.censusService.findAll({ _id: { $in: poll.censuses } })
  }

  @ResolveProperty(() => [PollResults])
  async results (@Parent() poll: Poll) {
    if (poll.end < new Date()) {
      return this.pollResultsService.findAll({ poll: poll.id })
    }
    throw new UnauthorizedException('Election is open')
  }

  @Mutation(() => Poll)
  async createPoll (@Args('input') { options, censuses, ...rest }: PollInput) {
    const censusesOnDB = await Promise.all(
      censuses.map(async ({ file, ...rest }) => {
        const voters = await this.filesService.readCSV(file)
        return this.censusService.create({
          voters,
          ...rest
        })
      })
    )

    const poll = await this.pollsService.create({
      censuses: censusesOnDB.map(({ id: census }) => census),
      options: options.map(text => ({ text })),
      ...rest
    })

    for (const census of censusesOnDB) {
      for (const option of poll.options) {
        await this.pollResultsService.create({
          option: option.id,
          census: census.id,
          poll: poll.id
        })
      }
    }
    return poll
  }

  @Mutation(() => Boolean)
  async voteOnPoll (
    @Args('input') { poll, option, rectifiedVote }: VotePollInput,
    @CurrentUser() user: User
  ) {
    let hasVoted = true

    const rectify = rectifiedVote.length > 0

    const currentPoll = await this.pollsService.findById(poll)
    const match = {
      _id: { $in: currentPoll.censuses },
      'voters.uid': user.uid
    }
    const voter = await this.censusService.findVoter(match)
    if (!voter) {
      throw new UnauthorizedException(
        'Apprently user is not allowed to vote in this election'
      )
    }

    const votes = await this.pollVoteService.findAll({ user: user, poll: poll })

    if (!rectify) {
      hasVoted = votes.length >= currentPoll.numVotesAllowed
    } else {
      hasVoted = !currentPoll.rectifyVote

      if (!hasVoted) {
        const oldVote = await this.pollVoteService.findById(rectifiedVote)

        if (oldVote) {
          await this.pollResultsService.findOneAndUpdate(
            {
              poll: mongoose.Types.ObjectId(poll),
              option: oldVote.option,
              census: voter.census
            },
            { $inc: { votes: -1 } }
          )

          await this.pollVoteService.delete(rectifiedVote)
        } else {
          throw new UnauthorizedException('Vote to be rectified not found')
        }
      } else {
        throw new UnauthorizedException("The poll doesn't accept rectify")
      }
    }

    if (hasVoted) {
      throw new UnauthorizedException('User has already Voted')
    }

    await this.pollResultsService.findOneAndUpdate(
      {
        poll: mongoose.Types.ObjectId(poll),
        option: mongoose.Types.ObjectId(option),
        census: voter.census
      },
      { $inc: { votes: 1 } }
    )

    await this.pollVoteService.create({
      poll: mongoose.Types.ObjectId(poll),
      option: mongoose.Types.ObjectId(option),
      user: user
    })

    return true
  }
}
