import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql'
import { DocumentType, mongoose } from '@typegoose/typegoose'
import { ID } from 'type-graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { CensusService } from '../census/census.service'
import { Census } from '../census/census.type'
import { FileService } from '../files/files.service'
import { UsersService } from '../users/users.service'
import { Genre, User } from '../users/users.type'
import {
  ElectionInput,
  UpdateElectionInput,
  VoteElectionInput,
} from './election.input'
import { ElectionResultsService } from './election.results.service'
import { ElectionsService } from './election.service'
import { Election } from './election.type'
import {
  ResultsFilter,
  resultsFilterDefault,
  ResultsForElection,
} from './electoral-process.results.type'

@Resolver(() => Election)
@UseGuards(GqlAuthGuard)
export class ElectionResolver {
  constructor(
    private readonly electionsService: ElectionsService,
    private readonly electionResultsService: ElectionResultsService,
    private readonly candidatesService: CandidatesService,
    private readonly filesService: FileService,
    private readonly censusService: CensusService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Election])
  async elections(): Promise<Election[]> {
    return this.electionsService.findAll()
  }

  @Query(() => [Election])
  async pendingElections(@CurrentUser() user: User): Promise<Election[]> {
    return this.electionsService.pendingElectionsOfVoter(user.uid)
  }

  @Query(() => Election)
  async election(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<DocumentType<Election>> {
    return this.electionsService.findById(id)
  }

  @Mutation(() => Election)
  async createElection(
    @CurrentUser() user: User,
    @Args('input') { censuses, candidates, ...rest }: ElectionInput
  ): Promise<DocumentType<Election>> {
    const censusesOnDB = await Promise.all(
      censuses.map(async census => {
        const filePath = await this.filesService.createJSON(census)
        return this.censusService.create({ ...census, filePath })
      })
    )

    const election = await this.electionsService.create({
      ...rest,
      secretary: user.id,
      censuses: censusesOnDB.map(census => census.id),
    })

    const candidatesOnDB = await Promise.all(
      candidates.map(candidate => {
        return this.candidatesService.create({
          ...candidate,
          election: election.id,
        })
      })
    )

    for (const census of censusesOnDB) {
      for (const candidate of candidatesOnDB) {
        for (const genre of Object.keys(Genre)) {
          // eslint-disable-next-line no-await-in-loop
          await this.electionResultsService.create({
            candidate: candidate.id,
            census: census.id,
            election: election.id,
            genre,
          })
        }
      }
    }

    return election
  }

  @ResolveProperty(() => [Candidate])
  async candidates(@Parent() election: Election): Promise<Candidate[]> {
    return this.candidatesService.findAll({ election: election.id })
  }

  @ResolveProperty(() => ResultsForElection)
  async results(
    @Parent() election: Election,
    @Args({
      name: 'filter',
      type: () => ResultsFilter,
      defaultValue: resultsFilterDefault,
    })
    filter: ResultsFilter
  ): Promise<ResultsForElection> {
    if (election.end < new Date()) {
      const {
        voters,
        whiteVotes,
      } = await this.electionsService.votersAndWhiteVotes(election.id)

      const results = await this.electionResultsService.groupResults(
        election.id,
        filter
      )

      const votesCast = results.reduce(
        (prev, current) => prev + current.votes,
        whiteVotes
      )

      return {
        voters,
        votesCast,
        whiteVotes,
        results,
      }
    }
    throw new UnauthorizedException('Election is not finished')
  }

  @ResolveProperty(() => [Census])
  async censuses(@Parent() election: Election): Promise<Census[]> {
    return this.censusService.findAll({ _id: { $in: election.censuses } })
  }

  @Mutation(() => Boolean)
  async voteOnElection(
    @Args('input') { election, candidates }: VoteElectionInput,
    @CurrentUser() user: User
  ): Promise<boolean> {
    const { censuses, maxVotes } = await this.electionsService.findById(
      election
    )
    if (candidates.length > maxVotes) {
      throw new BadRequestException(
        'Number of candidates is higher than allowed number'
      )
    }
    const match = {
      _id: { $in: censuses },
      'voters.uid': user.uid,
    }
    const voter = await this.censusService.findVoter(match)
    if (!voter) {
      throw new UnauthorizedException(
        'Apprently user is not allowed to vote in this election'
      )
    }
    if (voter.hasVoted) {
      throw new UnauthorizedException('User has already Voted')
    }
    await this.censusService.findOneAndUpdate(match, {
      $set: {
        'voters.$.hasVoted': true,
      },
    })
    if (candidates.length > 0) {
      await this.electionResultsService.updateMany(
        {
          candidate: {
            $in: candidates.map(candidate =>
              mongoose.Types.ObjectId(candidate)
            ),
          },
          election: mongoose.Types.ObjectId(election),
          census: voter.census,
        },
        { $inc: { votes: 1 } }
      )
    } else {
      await this.electionsService.update(mongoose.Types.ObjectId(election), {
        $inc: { whiteVotes: 1 },
      })
    }
    return true
  }

  @Mutation(() => Election)
  async modifyElection(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') data: UpdateElectionInput
  ): Promise<DocumentType<Election>> {
    return this.electionsService.update(id, data)
  }

  @ResolveProperty(() => [User])
  async delegates(@Parent() election: Election): Promise<User[]> {
    return this.usersService.findAll({ _id: { $in: election.delegates } })
  }

  @Mutation(() => Boolean)
  async deleteElection(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    const election = await this.electionsService.delete(id)
    await this.candidatesService.deleteByElection(election.id)
    await this.censusService.deleteAllIn(election.censuses)
    await this.electionResultsService.deleteByElection(election.id)
    return true
  }
}
