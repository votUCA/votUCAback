import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { UsersService } from '../users/users.service'
import { RoleInput } from './roles.input'
import { RolesService } from './roles.service'
import { Role } from './roles.type'
import { User } from '../users/users.type'

@Resolver(() => Role)
@UseGuards(GqlAuthGuard)
export class RolesResolver {
  constructor (private rolesService: RolesService, private usersService: UsersService) {}

  @Query(() => [Role])
  async roles () {
    return this.rolesService.findAll()
  }

  @Query(() => Role)
  async role (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.rolesService.findById(id)
  }

  @Mutation(() => Role)
  async createRole (@Args('input') input: RoleInput) {
    return this.rolesService.create(input)
  }

  @ResolveProperty(() => [User])
  async users (@Parent() role: Role) {
    return this.usersService.findAll({ roles: role })
  }
}
