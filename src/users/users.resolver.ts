import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { UserInput } from './users.input'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor (private usersService: UsersService) {}

  @Query(() => [User])
  async users () {
    return this.usersService.findAll()
  }

  @Query(() => User)
  async user (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.usersService.findById(id)
  }

  @Mutation(() => User)
  async createUser (@Args('input') input: UserInput) {
    return this.usersService.create(input)
  }
}
