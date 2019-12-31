import { ObjectType, Field, ID, Int } from 'type-graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { Election } from './election.type'
import { required, nullable } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { Census } from '../census/census.type'
import { Poll, PollOption } from './poll.type'

@ObjectType()
export class ElectionResults {
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field(() => Int)
  @prop({ default: 0 })
  votes: number

  @prop({ required })
  election: Ref<Election>

  @prop({ required })
  candidate: Ref<Candidate>

  @prop({ required })
  census: Ref<Census>

  @Field({ nullable })
  group?: string

  @Field({ nullable })
  location?: string
}

@ObjectType()
export class PollResults {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field(() => Int)
  @prop({ default: 0 })
  votes: number

  @prop({ required })
  poll: Ref<Poll>

  @prop({ required })
  option: Ref<PollOption>

  @prop({ required })
  census: Ref<Census>

  @Field({ nullable })
  group?: string

  @Field({ nullable })
  location?: string
}
