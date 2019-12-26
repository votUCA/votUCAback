import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './election.service'
import { ElectoralProcess } from './electoral-process.type'
import { ID } from 'type-graphql'
import { PollsService } from './poll.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor (
    private readonly electionsService: ElectionsService,
    private readonly pollsService: PollsService
  ) {}

  @Query(() => [ElectoralProcess])
  async electoralprocesses () {
    const elections = await this.electionsService.findAll()
    const polls = await this.pollsService.findAll()

    return [...elections, ...polls]
  }

  @Query(() => ElectoralProcess)
  async electoralprocess (@Args({ name: 'id', type: () => ID }) id: string) {
    const election = await this.electionsService.findById(id)
    const poll = await this.pollsService.findById(id)
    return election || poll
  }
}
