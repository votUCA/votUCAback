import { UnauthorizedException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver
} from '@nestjs/graphql'
import { mongoose } from '@typegoose/typegoose'
import { ID } from 'type-graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { CensusService } from '../census/census.service'
import { Census } from '../census/census.type'
import { FileService } from '../files/files.service'
import { User } from '../users/users.type'
import { ElectionInput, VoteElectionInput, UpdateElectionInput } from './election.input'
import { ElectionResultsService } from './election.results.service'
import { ElectionsService } from './election.service'
import { Election, ElectionResultsArgs } from './election.type'
import { ElectionResults } from './electoral-process.results.type'

@Resolver(() => Election)
@UseGuards(GqlAuthGuard)
export class ElectionResolver {
  constructor (
    private readonly electionsService: ElectionsService,
    private readonly electionResultsService: ElectionResultsService,
    private readonly candidatesService: CandidatesService,
    private readonly filesService: FileService,
    private readonly censusService: CensusService
  ) {}

  @Query(() => [Election])
  async elections () {
    return this.electionsService.findAll()
  }

  @Query(() => [Election])
  async pendingElections (@CurrentUser() user: User) {
    return this.electionsService.pendingElectionsOfVoter(user.uid)
  }

  @Query(() => Election)
  async election (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.electionsService.findById(id)
  }

  @Mutation(() => Election)
  async createElection (
    @Args('input') { censuses, candidates, ...rest }: ElectionInput
  ) {
    const censusesOnDB = await Promise.all(
      censuses.map(async ({ file, date, group, location }) => {
        const voters = await this.filesService.readCSV(file)
        return this.censusService.create({
          voters,
          date,
          group,
          location
        })
      })
    )

    const election = await this.electionsService.create({
      ...rest,
      censuses: censusesOnDB.map(census => census.id)
    })

    const candidatesOnDB = await Promise.all(
      candidates.map(candidate => {
        return this.candidatesService.create({
          ...candidate,
          election: election.id
        })
      })
    )

    for (const census of censusesOnDB) {
      for (const candidate of candidatesOnDB) {
        await this.electionResultsService.create({
          candidate: candidate.id,
          census: census.id,
          election: election.id
        })
      }
    }
    return election
  }

  @ResolveProperty(() => [Candidate])
  async candidates (@Parent() election: Election) {
    return this.candidatesService.findAll({ election: election.id })
  }

  @ResolveProperty(() => [ElectionResults])
  async results (@Parent() election: Election, @Args() { location, group }: ElectionResultsArgs) {
    if (election.end < new Date()) {
      const res = await this.electionResultsService.groupResults(election.id, group, location)
      console.log(res)
      return res
    }
    throw new UnauthorizedException('Election is not finished')
  }

  @ResolveProperty(() => [Census])
  async censuses (@Parent() election: Election) {
    return this.censusService.findAll({ _id: { $in: election.censuses } })
  }

  @Mutation(() => Boolean)
  async voteOnElection (
    @Args('input') { election, candidate }: VoteElectionInput,
    @CurrentUser() user: User
  ) {
    const { censuses } = await this.electionsService.findById(election)
    const match = {
      _id: { $in: censuses },
      'voters.uid': user.uid
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
        'voters.$.hasVoted': true
      }
    })
    await this.electionResultsService.findOneAndUpdate(
      {
        candidate: mongoose.Types.ObjectId(candidate),
        election: mongoose.Types.ObjectId(election),
        census: voter.census
      },
      { $inc: { votes: 1 } }
    )
    return true
  }

  @Mutation(() => Election)
  async modifyElection (@Args({ name: 'id', type: () => ID }) id: string, @Args('input') data: UpdateElectionInput) {
    return this.electionsService.update(id, data)
  }
}
