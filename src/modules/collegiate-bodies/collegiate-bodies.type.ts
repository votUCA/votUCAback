import { ObjectType, Field, ID } from 'type-graphql'
import { Ref, prop, arrayProp } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { User } from '../users/users.type'

@ObjectType()
export class CollegiateBody {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  name: string

  @Field(() => [String])
  @arrayProp({ itemsRef: 'User' })
  collegiates: Ref<User>[]
}
