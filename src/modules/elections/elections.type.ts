import { Field, ID, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class Election {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field(() => [String])
  @prop({ required })
  candidate: string[]

  @Field(() => [Int])
  @prop({ required })
  electionsAnswers: number[]

  @Field()
  @prop({ required })
  voteOtherGroup: boolean

  @Field(() => Int)
  @prop({ required })
  nVotes: number

  @Field(() => [Int])
  @prop({ required })
  votesAnswers: number[]
}
