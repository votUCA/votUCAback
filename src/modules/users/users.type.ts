import { Field, ID, ObjectType } from 'type-graphql'
import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { Role } from '../roles/roles.type'

@ObjectType()
export class User {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  uid: string

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string

  @arrayProp({ itemsRef: Role })
  roles?: Ref<Role>[]
}
