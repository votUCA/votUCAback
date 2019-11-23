import { Field, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { ElectoralProcessBase } from '../electoral-process/electoral-process.abstract'

@ObjectType()
export class Election extends ElectoralProcessBase {
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
