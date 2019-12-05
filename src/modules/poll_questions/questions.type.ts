import { Field, ID, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class Question {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  question: string

  @Field()
  @prop({ required })
  idPoll: string
}
