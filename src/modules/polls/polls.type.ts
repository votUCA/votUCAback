import { Field, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { ElectoralProcessBase } from '../electoral-process/electoral-process.abstract'

@ObjectType()
export class Poll extends ElectoralProcessBase {
  @Field()
  @prop({ required })
  question: string

  @Field(() => [String])
  @prop({ required })
  answers: string[]

  @Field()
  @prop({ required })
  presencial: boolean

  @Field()
  @prop({ required })
  canEdit: boolean

  @Field()
  @prop({ required })
  isSecret: boolean

  @Field(() => [Int])
  @prop({ required })
  votesAnswer: number[]
}
