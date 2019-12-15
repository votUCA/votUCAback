import { prop, arrayProp } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { RoleType, Roles } from './roles.enum'

@ObjectType()
export class User {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  uid: string

  @prop({ required })
  password: string

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string

  @arrayProp({ enum: Object.keys(Roles), default: [], type: String })
  @Field(() => Roles)
  roles?: [RoleType]
}
