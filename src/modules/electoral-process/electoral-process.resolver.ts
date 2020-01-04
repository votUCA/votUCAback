import { UseGuards } from '@nestjs/common'
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { DocumentType } from '@typegoose/typegoose'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './election.service'
import { ElectoralProcess } from './electoral-process.type'
import { PollsService } from './poll.service'
import { Election } from './election.type'
import { Poll } from './poll.type'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor(
    private readonly electionsService: ElectionsService,
    private readonly pollsService: PollsService
  ) {}

  @Query(() => [ElectoralProcess])
  async electoralProcesses(): Promise<(Election | Poll)[]> {
    const elections = await this.electionsService.findAll()
    const polls = await this.pollsService.findAll()

    return [...elections, ...polls]
  }

  @Query(() => ElectoralProcess)
  async electoralProcess(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<DocumentType<Election | Poll>> {
    const election = await this.electionsService.findById(id)
    const poll = await this.pollsService.findById(id)
    return election || poll
  }

  @Query(() => [ElectoralProcess], {
    description:
      'Devuelve aquellos procesos electorales que aún no han sido iniciados',
  })
  async futureElectoralProcesses(): Promise<(Election | Poll)[]> {
    const query = { start: { $gt: new Date() } }
    const elections = await this.electionsService.findAll(query)
    const polls = await this.pollsService.findAll(query)

    return [...elections, ...polls]
  }

  @Query(() => [ElectoralProcess], {
    description:
      'Devuelve aquellos procesos electorales que han sido finalizados',
  })
  async pastElectoralProcesses(): Promise<(Election | Poll)[]> {
    const query = { end: { $lte: new Date() } }
    const elections = await this.electionsService.findAll(query)
    const polls = await this.pollsService.findAll(query)

    return [...elections, ...polls]
  }

  @Mutation(() => [ElectoralProcess])
  async removeElectoralProcesses(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<Election | Poll> {
    const election = await this.electionsService.removeById(id)
    const poll = await this.pollsService.removeById(id)
    return election || poll
  }
}
