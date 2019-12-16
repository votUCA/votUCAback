import { Resolver, Query, Args, Parent } from '@nestjs/graphql'
import { Census } from './censuses.type'
import { CensusesService } from './censuses.service'
import { ID, FieldResolver } from 'type-graphql'
import { User } from '../users/users.type'
import { UsersService } from '../users/users.service'

@Resolver(() => Census)
export class CensusesResolver {
  constructor (
    private readonly censusesService: CensusesService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Census])
  async censuses () {
    return this.censusesService.findAll()
  }

  @Query(() => Census)
  async census (@Args({ type: () => ID, name: 'id' }) id: string) {
    return this.censusesService.findById(id)
  }

  @FieldResolver(() => [User])
  async voters (@Parent() census: Census) {
    return this.usersService.findAll({ _id: { $in: census.voters } })
  }
}
