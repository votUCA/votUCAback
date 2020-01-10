import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { ElectionResults, PollResults } from './electoral-process.results.type'
import { PollOption } from './poll.type'
import { PollsService } from './poll.service'

@Resolver(() => ElectionResults)
export class ElectionResultsResolver {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ResolveProperty(() => Candidate)
  async candidate(
    @Parent() { candidate }: ElectionResults
  ): Promise<DocumentType<Candidate>> {
    return this.candidatesService.findById(candidate)
  }
}

@Resolver(() => PollResults)
export class PollResultsResolver {
  constructor(private readonly pollService: PollsService) {}

  @ResolveProperty(() => PollOption)
  async option(@Parent() { option }: PollResults): Promise<PollOption> {
    return this.pollService.findOption(option)
  }
}
