import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { UsersService } from './users.service'
import { User } from './users.type'
import { AuthService } from '../auth/auth.service'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor (private readonly usersService: UsersService) {}

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
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Mutation(() => LoginPayload)
  async login (
    @Args('input')
      input: LoginInput
  ): Promise<LoginPayload> {
    const tokenPayload = await this.userService.authenticate(input)
    const accessToken = await this.authService.createToken(tokenPayload)
    console.log({ accessToken, input })
    return { accessToken }
  }
}
