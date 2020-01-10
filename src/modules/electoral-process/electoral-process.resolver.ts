import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql.guard'
import { User } from '../users/users.type'
import { ElectionsService } from './election.service'
import { Election } from './election.type'
import { ElectoralProcessFilter } from './electoral-process.abstract'
import { ElectoralProcess } from './electoral-process.type'
import { PollsService } from './poll.service'
import { Poll } from './poll.type'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor(
    private readonly electionsService: ElectionsService,
    private readonly pollsService: PollsService
  ) {}

  @Query(() => [ElectoralProcess])
  async electoralProcesses(
    @Args() { open, finished }: ElectoralProcessFilter
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
  ): Promise<Election | Poll> {
    const election = await this.electionsService.findById(id)
    const poll = await this.pollsService.findById(id)
    return election || poll
  }

  @Query(() => [ElectoralProcess])
  async pendingElectoralProcesses(
    @CurrentUser() user: User
  ): Promise<(Election | Poll)[]> {
    const pending = await Promise.all<Election[], Poll[]>([
      this.electionsService.pendingElectionsOfVoter(user.uid),
      this.pollsService.pendingPollsOfVoter(user.uid),
    ])
    return pending.flat()
  }
}
