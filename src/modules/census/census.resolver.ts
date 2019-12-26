import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID, Int } from 'type-graphql'
import { CensusService } from './census.service'
import { Census } from './census.type'

@Resolver(() => Census)
export class CensusResolver {
  constructor (private readonly censusService: CensusService) {}

  @Query(() => Census)
  async census (@Args({ type: () => ID, name: 'id' }) id: string) {
    return this.censusService.findById(id)
  }

  @Query(() => [Census])
  async censues (@Args({ type: () => Int, name: 'limit', defaultValue: 0 }) limit: number, @Args({ type: () => Int, name: 'skip', defaultValue: 0 }) skip: number) {
    return this.censusService.findAll({ }, { skip, limit })
  }
}
