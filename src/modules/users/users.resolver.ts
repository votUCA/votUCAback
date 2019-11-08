import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { UserInput } from './users.input'
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
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Mutation(() => User)
  async createUser (@Args('input') input: UserInput) {
    return this.usersService.create(input)
  }

  @Mutation(() => LoginPayload)
  async login (
    @Args('input')
      input: LoginInput
  ): Promise<LoginPayload> {
    const id = await this.usersService.login(input)
    const accessToken = await this.authService.createToken(id)
    return { accessToken }
  }
}
