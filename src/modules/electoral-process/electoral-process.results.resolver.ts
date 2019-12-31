import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { CensusService } from '../census/census.service'
import { ElectionResults, PollResults } from './electoral-process.results.type'
import { PollOption } from './poll.type'
import { PollsService } from './poll.service'

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
}

@Resolver(() => PollResults)
export class PollResultsResolver {
  constructor (
    private readonly censusService: CensusService,
    private readonly pollService: PollsService
  ) {}

  @ResolveProperty(() => PollOption)
  async option (@Parent() { option }: PollResults) {
    return this.pollService.findOption(option)
  }

  @ResolveProperty(() => String)
  async group (@Parent() results: PollResults) {
    const census = await this.censusService.findById(results.census)
    return census.group
  }

  @ResolveProperty(() => String)
  async location (@Parent() results: PollResults) {
    const census = await this.censusService.findById(results.census)
    return census.location
  }
}
