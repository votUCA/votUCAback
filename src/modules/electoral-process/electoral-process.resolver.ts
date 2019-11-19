import { Resolver, Query, Args } from '@nestjs/graphql'
import { ElectoralProcess } from './electoral-process.type'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ID } from 'type-graphql'
import { ElectoralProcessService } from './electoral-process.service'

@Resolver(() => ElectoralProcess)
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor (private electoralprocessService: ElectoralProcessService) {}

  @Query(() => [ElectoralProcess])
  async electoralprocess () {
    return this.electoralprocessService.findAll()
  }

  @Query(() => ElectoralProcess)
  async electoralprocesses (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.electoralprocessService.findById(id)
  }
}
