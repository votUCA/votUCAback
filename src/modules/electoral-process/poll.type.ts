import { arrayProp, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType, ArgsType } from 'type-graphql'
import { required } from '../../common/constants'
import { ElectoralProcess } from './electoral-process.abstract'
import { User } from '../users/users.type'
import { CollegiateBody } from '../collegiate-bodies/collegiate-bodies.type'

@ObjectType()
export class PollOption {
  @Field(() => ID)
  get id (this: any) {
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

  @Field()
  @prop({ required })
  numVotesAllowed: number

  @Field(() => Boolean)
  @prop({ required })
  realTime: boolean

  @Field(() => String)
  @prop({ required })
  collegiateBody: Ref<CollegiateBody>
}

@ObjectType()
export class PollVote {
  @Field(() => ID)
  get id (this: any) {
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

@ArgsType()
export class PollResultsArgs {
    @Field({ defaultValue: false })
    group: boolean

    @Field({ defaultValue: false })
    location: boolean

    @Field({ defaultValue: false })
    genre: boolean
}
