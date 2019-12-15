import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { CensusService } from '../census/census.service'
import { ElectionResults } from './electoral-process.results.type'

@Resolver(() => ElectionResults)
export class ElectionResultsResolver {
  constructor (
    private readonly candidatesService: CandidatesService,
    private readonly censusService: CensusService
  ) {}

  @ResolveProperty(() => Candidate)
  async candidate (@Parent() { candidate }: ElectionResults) {
    return this.candidatesService.findById(candidate)
  }

  @ResolveProperty(() => String)
  async group (@Parent() results: ElectionResults) {
    const census = await this.censusService.findById(results.census)
    return census.group
  }

  @ResolveProperty(() => String)
  async location (@Parent() results: ElectionResults) {
    const census = await this.censusService.findById(results.census)
    return census.location
  }
}
