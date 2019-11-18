import { Resolver, Query, Args } from '@nestjs/graphql'
import { Poll } from './polls.type'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.guard'
import { PollsService } from './polls.service'
import { ID } from 'type-graphql'

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
}
