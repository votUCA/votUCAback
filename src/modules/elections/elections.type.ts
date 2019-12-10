import { prop } from '@typegoose/typegoose'
import { Field, Int, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { ElectoralProcessBase } from '../electoral-process/electoral-process.abstract'

@ObjectType()
export class Election extends ElectoralProcessBase {
  @Field()
  @prop({ required })
  voteOtherGroup: boolean

  @Field(() => Int)
  @prop({ required })
  nVotes: number
}
