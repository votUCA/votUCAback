import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
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
}
