import {
  Args,
  Query,
  Resolver,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ID } from 'type-graphql'
import { ColegiateBodyService } from './colegiate-bodies.service'
import { ColegiateBody } from './colegiate-bodies.type'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ColegiateBodyInput } from './colegiate-bodies.input'
import { UsersService } from '../users/users.service'
import { User } from '../users/users.type'

@Resolver(() => ColegiateBody)
@UseGuards(GqlAuthGuard)
export class ColegiateBodyResolver {
  constructor(
    private readonly colegiateBodyService: ColegiateBodyService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => ColegiateBody)
  async colegiateBody(
    @Args({ type: () => ID, name: 'id' }) id: string
  ): Promise<ColegiateBody> {
    return this.colegiateBodyService.findById(id)
  }

  @Query(() => [ColegiateBody])
  async collegiateBodies(): Promise<ColegiateBody[]> {
    return this.colegiateBodyService.findAll()
  }

  @Mutation(() => ColegiateBody)
  async createColegiateBody(
    @Args('input') input: ColegiateBodyInput
  ): Promise<ColegiateBody> {
    return this.colegiateBodyService.create(input)
  }

  @ResolveProperty(() => [User])
  async users(@Parent() { id }: ColegiateBody): Promise<User[]> {
    return this.usersService.findAll({ colegiateBody: id })
  }
}
