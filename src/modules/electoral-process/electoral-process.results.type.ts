import { ObjectType, Field, ID, Int } from 'type-graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { Election } from './election.type'
import { required } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { Census } from '../census/census.type'

@ObjectType()
export class ElectionResults {
  @Field(() => ID)
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
}
