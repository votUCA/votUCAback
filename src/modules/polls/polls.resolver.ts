import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { PollInput } from './polls.input'
import { PollsService } from './polls.service'
import { Poll } from './polls.type'

@Resolver(() => Poll)
@UseGuards(GqlAuthGuard)
export class PollsResolver {
  constructor (private pollsService: PollsService) {}

  @Query(() => [Poll])
  async polls () {
    return this.pollsService.findAll()
  }

  @Query(() => Poll)
  async poll (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pollsService.findById(id)
  }

  @Mutation(() => Poll)
  async createPoll (@Args('input') input: PollInput) {
    return this.pollsService.create(input)
  }
}
