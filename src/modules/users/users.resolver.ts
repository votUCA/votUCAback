import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { CollegiateBodiesService } from '../collegiate-bodies/collegiate-bodies.service'
import { CollegiateBody } from '../collegiate-bodies/collegiate-bodies.type'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { UserUpdateInput } from './users.input'
import { UsersService } from './users.service'
import { User } from './users.type'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor (private readonly usersService: UsersService,
    private readonly collegiateBodiesService: CollegiateBodiesService
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

  @Mutation(() => User)
  async modifyUser (@Args({ name: 'id', type: () => ID }) id: string, @Args('input') data: UserUpdateInput) {
    return this.usersService.update(id, data)
  }

  @ResolveProperty(() => CollegiateBody)
  async organoColegiado (@Parent() user: User) {
    return this.collegiateBodiesService.findById(user.collegiateBody)
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
    return { accessToken }
  }
}
