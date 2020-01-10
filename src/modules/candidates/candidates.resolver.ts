import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidateDeleteArgs } from './candidates.input'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'

@Resolver()
@UseGuards(GqlAuthGuard)
export class CandidatesResolver {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Mutation(() => Candidate)
  async deleteCandidate(
    @Args() { id, election }: CandidateDeleteArgs
  ): Promise<Candidate> {
    return this.candidatesService.deleteByIdAndElection(id, election)
  }
}
