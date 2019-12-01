import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { LdapService } from '../ldap/ldap.service'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { User } from './users.type'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor (private readonly ldapService: LdapService) {}

  // FIXME: replace null with the real query
  @Query(() => [User])
  async users () {
    return null
  }

  @Query(() => User)
  async user (@Args({ name: 'uid', type: () => ID }) uid: string) {
    return this.ldapService.findByUid(uid)
  }

  @Query(() => User)
  async me (@CurrentUser() user: User) {
    return user
  }

  @Query(() => [User])
  async usersByGroup (@Args({ name: 'group', type: () => String }) group: string) {
    return this.ldapService.findAll({
      group: `ou=${group},`,
      scope: 'sub',
      filter: '(objectClass=inetOrgPerson)'
    })
  }
}

@Resolver(() => User)
export class UnprotectedUsersResolver {
  constructor (
    private readonly ldapService: LdapService,
    private readonly authService: AuthService
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
    const accessToken = await this.authService.createToken(input.uid)
    return { accessToken }
  }
}
