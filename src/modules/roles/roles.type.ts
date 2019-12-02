
import { prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'

@ObjectType()
export class Role {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  name: string
}
