import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { ColegiateBodyService } from './colegiate-bodies.service'
import { ColegiateBody } from './colegiate-bodies.type'

@Resolver(() => ColegiateBody)
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
}
