import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver
} from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { FileService } from '../files/files.service'
import { ElectionInput } from './election.input'
import { ElectionResultsService } from './election.results.service'
import { ElectionsService } from './election.service'
import { Election } from './election.type'
import { ElectionResults } from './electoral-process.results.type'
import { CensusService } from '../census/census.service'
import { Census } from '../census/census.type'

@Resolver(() => Election)
@UseGuards(GqlAuthGuard)
export class ElectionResolver {
  constructor (
    private readonly electionsService: ElectionsService,
    private readonly electioResultsService: ElectionResultsService,
    private readonly candidatesService: CandidatesService,
    private readonly filesService: FileService,
    private readonly censusService: CensusService
  ) {}

  @Query(() => [Election])
  async election () {
    return this.electionsService.findAll()
  }

  @Query(() => Election)
  async elections (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.electionsService.findById(id)
  }

  @Mutation(() => Election)
  async createElection (
    @Args('input') { censuses, candidates, ...rest }: ElectionInput
  ) {
    const census = await Promise.all(
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
      censuses: census
    })
    await this.candidatesService.create(
      candidates.map(candidate => ({ ...candidate, election }))
    )
    return election
  }

  @ResolveProperty(() => [Candidate])
  async candidates (@Parent() election: Election) {
    return this.candidatesService.findAll({ election })
  }

  @ResolveProperty(() => [ElectionResults])
  async results (@Parent() election: Election) {
    return this.electioResultsService.findAll({ election })
  }

  @ResolveProperty(() => [Census])
  async censuses (@Parent() election: Election) {
    return this.censusService.findAll({ _id: { $in: election.censuses } })
  }
}
