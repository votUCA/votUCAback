import { Field, ID, ObjectType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class Answer {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field(() => String, { nullable: true })
  @prop()
  idPosibleAnswer?: string

  @Field(() => String, { nullable: true })
  @prop()
  idCandidate?: string
}
