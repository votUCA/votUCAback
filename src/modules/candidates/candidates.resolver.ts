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
  constructor (private candidatesService: CandidatesService) {}

  @Query(() => [Candidate])
  async candidates () {
    return this.candidatesService.findAll()
  }

  @Query(() => Candidate)
  async candidate (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.candidatesService.findById(id)
  }

  @Mutation(() => Candidate)
  async createCandidate (@Args('input') input: CandidateInput) {
    return this.candidatesService.create(input)
  }
}