import { Inject } from '@nestjs/common'
import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { CensusService } from '../census/census.service'
import { User } from '../users/users.type'
import { ElectoralProcess } from './electoral-process.abstract'
import { PollResultsService } from './poll.results.service'

@ObjectType()
export class PollOption {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  text: string
}

class PollDeleter {
  @Inject(CensusService)
  public static readonly censusService: CensusService

  @Inject(PollResultsService)
  public static readonly pollResultService: PollResultsService
}

@ObjectType()
@post<Poll>('remove', async poll => {
  await PollDeleter.pollResultService.deleteByPoll(poll)
  await PollDeleter.censusService.deleteAllIn(poll.censuses)
})
export class Poll extends ElectoralProcess {
  @Field()
  @prop({ required })
  question: string

  @Field(() => [PollOption])
  @arrayProp({ items: PollOption, required })
  options: PollOption[]

  @Field(() => Boolean)
  @prop({ required })
  isRealTime: boolean
}

@ObjectType()
export class PollVote {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field(() => String)
  @prop({ required, ref: 'User' })
  user: Ref<User>

  @Field(() => String)
  @prop({ required, ref: 'Poll' })
  poll: Ref<Poll>

  @Field(() => String)
  @prop({ required, ref: 'PollOption' })
  option: Ref<PollOption>
}
