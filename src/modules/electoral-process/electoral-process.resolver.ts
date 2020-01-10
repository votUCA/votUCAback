import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { DocumentType } from '@typegoose/typegoose'
import { CurrentUser } from 'modules/auth/current-user.decorator'
import { User } from 'modules/users/users.type'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './election.service'
import { ElectoralProcess } from './electoral-process.type'
import { PollsService } from './poll.service'
import { Election } from './election.type'
import { Poll } from './poll.type'
import { ElectoralProcessFilter } from './electoral-process.abstract'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor(
    private readonly electionsService: ElectionsService,
    private readonly pollsService: PollsService
  ) {}

  @Query(() => [ElectoralProcess])
  async electoralProcesses(
    @Args({
      name: 'filter',
      type: () => ElectoralProcessFilter,
      defaultValue: { open: false, finished: false },
    })
    { open, finished }: ElectoralProcessFilter
  ): Promise<(Election | Poll)[]> {
    let query = {}
    if (open) {
      query = { start: { $gt: new Date() } }
    }
    if (finished) {
      query = { end: { $lte: new Date() } }
    }
    const elections = await this.electionsService.findAll(query)
    const polls = await this.pollsService.findAll(query)

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

  @Query(() => [ElectoralProcess])
  async pendingElectoralProcesses(
    @CurrentUser() user: User
  ): Promise<(Election | Poll)[]> {
    const peding = await Promise.all([
      this.electionsService.pendingElectionsOfVoter(user.uid),
      this.pollsService.pendingPollsOfVoter(user.uid),
    ])
    return peding.flat()
  }
}
