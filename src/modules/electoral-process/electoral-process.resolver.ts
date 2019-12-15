import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './election.service'
import { ElectoralProcess } from './electoral-process.type'
import { ID } from 'type-graphql'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor (private electionsService: ElectionsService) {}

  @Query(() => [ElectoralProcess])
  async electoralprocesses () {
    const elections = await this.electionsService.findAll()

    return [...elections]
  }

  @Query(() => ElectoralProcess)
  async electoralprocess (@Args({ name: 'id', type: () => ID }) id: string) {
    const election = await this.electionsService.findById(id)

    return election
  }
}
