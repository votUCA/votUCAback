import { arrayProp, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { User } from '../users/users.type'
import { ElectoralProcess } from './electoral-process.abstract'

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

@ObjectType()
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
