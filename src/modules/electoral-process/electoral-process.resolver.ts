import { UseGuards } from '@nestjs/common'
import { Query, Resolver, Args } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from '../elections/elections.service'
import { PollsService } from '../polls/polls.service'
import { ElectoralProcess } from './electoral-process.type'
import { ID } from 'type-graphql'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ElectoralProcessResolver {
  constructor (private pollsService: PollsService, private electionsService: ElectionsService) {}

  @Query(() => [ElectoralProcess])
  async electoralprocesses () {
    const polls = await this.pollsService.findAll()
    const elections = await this.electionsService.findAll()

    return [...polls, ...elections]
  }

  @Query(() => [ElectoralProcess])
  async electoralprocess (@Args({ name: 'id', type: () => ID }) id: string) {
    const poll = await this.pollsService.findById(id)
    const election = await this.electionsService.findById(id)

    return poll || election
  }
}
