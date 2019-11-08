import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required: true })
  user: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string
}
