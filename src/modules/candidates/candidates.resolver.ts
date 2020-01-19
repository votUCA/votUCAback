import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidateDeleteArgs } from './candidates.input'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../users/roles.enum'
import { RolesGuard } from '../auth/roles.guard'

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class CandidatesResolver {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Mutation(() => Boolean)
  @Roles(Role.SECRETARY, Role.ADMIN)
  async deleteCandidate(
    @Args() { id, election }: CandidateDeleteArgs
  ): Promise<Candidate> {
    return this.candidatesService.deleteByIdAndElection(id, election)
  }
}
