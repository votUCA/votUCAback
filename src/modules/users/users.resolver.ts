import { BadRequestException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver
} from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { LdapService } from '../ldap/ldap.service'
import { RolesService } from '../roles/roles.service'
import { Role } from '../roles/roles.type'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { UsersService } from './users.service'
import { User } from './users.type'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor (
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [User])
  async users () {
    return this.usersService.findAll()
  }

  @Query(() => User)
  async user (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.usersService.findById(id)
  }

  @Query(() => User)
  async me (@CurrentUser() user: User) {
    return user
  }

  @ResolveProperty(() => [Role], { nullable: true })
  async roles (@Parent() user: User) {
    if (user.roles) {
      return this.rolesService.findAll({ _id: { $in: user.roles } })
    }
    return null
  }
}

@Resolver(() => User)
export class UnprotectedUsersResolver {
  constructor (
    private readonly ldapService: LdapService,
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Mutation(() => LoginPayload)
  async login (
    @Args('input')
      input: LoginInput
  ): Promise<LoginPayload> {
    const isValid = await this.ldapService.ldapAuth(input)
    if (!isValid) {
      throw new BadRequestException('user or password are incorrect')
    }
    const user = await this.userService.findByUid(input.uid)
    const accessToken = await this.authService.createToken(user.id)
    return { accessToken }
  }
}
