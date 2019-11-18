import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { LdapService } from '../ldap/ldap.service'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
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

  @Query(() => User)
  async me (@CurrentUser() user: User) {
    return user
  }
}

@Resolver(() => User)
export class UnprotectedUsersResolver {
  constructor (
    private ldapService: LdapService,
    private authService: AuthService
  ) {}

  @Mutation(() => LoginPayload)
  async login (
    @Args('input')
      input: LoginInput
  ): Promise<LoginPayload> {
    const id = await this.ldapService.ldapAuth(input)
    if (!id) {
      throw new BadRequestException('user or password are incorrect')
    }
    const accessToken = await this.authService.createToken(input.user)
    return { accessToken }
  }
}
