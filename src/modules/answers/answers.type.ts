import { prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'

@ObjectType()
export class Answer {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  idCandidate?: string

  @Field()
  @prop({ required })
  idPosibleAnswer?: string
}
