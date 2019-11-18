import { Field, ID, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class Poll {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

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
