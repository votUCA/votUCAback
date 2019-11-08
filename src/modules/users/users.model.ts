import { prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'

@ObjectType()
export class User {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  user: string

  @Field()
  @prop({ required })
  password: string

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string
}
