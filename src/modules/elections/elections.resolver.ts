import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './elections.service'
import { Election } from './elections.type'

@Resolver(() => Election)
@UseGuards(GqlAuthGuard)
export class ElectionsResolver {
  constructor (private electionsService: ElectionsService) {}

  @Query(() => [Election])
  async elections () {
    return this.electionsService.findAll()
  }

  @Query(() => Election)
  async election (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.electionsService.findById(id)
  }
}
