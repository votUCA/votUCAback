import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AuthService } from '../auth/auth.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ColegiateBodyService } from '../colegiate-bodies/colegiate-bodies.service'
import { ColegiateBody } from '../colegiate-bodies/colegiate-bodies.type'
import { LoginInput } from './login.input'
import { LoginPayload } from './login.payload'
import { UserUpdateInput, UserInput } from './users.input'
import { UsersService } from './users.service'
import { User } from './users.type'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { Role } from './roles.enum'

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly colegiateBodyService: ColegiateBodyService
  ) {}

  @Query(() => [User])
  @Roles(Role.ADMIN)
  async users(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(() => User)
  @Roles(Role.ADMIN)
  async user(@Args({ name: 'id', type: () => ID }) id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN)
  async modifyUser(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') data: UserUpdateInput
  ): Promise<User> {
    return this.usersService.update(id, data)
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN)
  async createUser(
    @Args('input') data: UserInput
  ): Promise<User> {
    return this.usersService.create(data)
  }

  @ResolveProperty(() => ColegiateBody, {nullable: true})
  async colegiateBody(@Parent() user: User): Promise<ColegiateBody> {
    return this.colegiateBodyService.findById(user.colegiateBody)
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN)
  async deleteUser(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<User> {
    return this.usersService.delete(id)
  }
}

@Resolver(() => User)
export class UnprotectedUsersResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Mutation(() => LoginPayload)
  async login(
    @Args('input')
    input: LoginInput
  ): Promise<LoginPayload> {
    const tokenPayload = await this.userService.authenticate(input)
    const accessToken = await this.authService.createToken(tokenPayload)
    return { accessToken }
  }
}
