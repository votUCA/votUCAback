import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
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
  async censuses () {
    return this.censusService.findAll()
  }
}
