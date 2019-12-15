import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql'
import { Candidate } from '../candidates/candidates.type'
import { CandidatesService } from '../candidates/candidates.service'
import { ElectionResults } from './electoral-process.results.type'

@Resolver(() => ElectionResults)
export class ElectionResultsResolver {
  constructor (private readonly candidatesService: CandidatesService) {}

  @ResolveProperty(() => Candidate)
  async candidate (@Parent() { candidate }: ElectionResults) {
    return this.candidatesService.findById(candidate)
  }
}
