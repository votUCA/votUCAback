import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CandidateInput } from './candidates.input'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'

@Resolver(() => Candidate)
@UseGuards(GqlAuthGuard)
export class CandidatesResolver {
  constructor (private candidatessService: CandidatesService) {}

  @Query(() => [Candidate])
  async candidatess () {
    return this.candidatessService.findAll()
  }

  @Query(() => Candidate)
  async candidates (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.candidatessService.findById(id)
  }

  @Mutation(() => Candidate)
  async createCandidates (@Args('input') input: CandidateInput) {
    return this.candidatessService.create(input)
  }
}
