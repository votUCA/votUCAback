import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ID } from 'type-graphql'
import { ColegiateBodyService } from './colegiate-bodies.service'
import { ColegiateBody } from './colegiate-bodies.type'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ColegiateBodyInput } from './colegiate-bodies.input'

@Resolver(() => ColegiateBody)
@UseGuards(GqlAuthGuard)
export class ColegiateBodyResolver {
  constructor(private readonly colegiateBodyService: ColegiateBodyService) {}

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

  @Mutation()
  async createColegiateBody(
    @Args('input') input: ColegiateBodyInput
  ): Promise<ColegiateBody> {
    return this.colegiateBodyService.create(input)
  }
}
