import { Args, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ID, Int } from 'type-graphql'
import { CensusService } from './census.service'
import { Census } from './census.type'
import { GqlAuthGuard } from '../auth/gql.guard'

@Resolver(() => Census)
@UseGuards(GqlAuthGuard)
export class CensusResolver {
  constructor(private readonly censusService: CensusService) {}

  @Query(() => Census)
  async census(
    @Args({ type: () => ID, name: 'id' }) id: string
  ): Promise<Census> {
    return this.censusService.findById(id)
  }

  @Query(() => [Census])
  async censuses(
    @Args({ type: () => Int, name: 'limit', defaultValue: 0 }) limit: number,
    @Args({ type: () => Int, name: 'skip', defaultValue: 0 }) skip: number
  ): Promise<Census[]> {
    return this.censusService.findAll({}, { skip, limit })
  }
}
