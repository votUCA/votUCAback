import { Field, ObjectType, ID } from 'type-graphql'
import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { User } from '../users/users.type'

@ObjectType()
export class Census {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  group: string

  @Field()
  @prop({ required })
  place: string

  @Field(() => Date)
  date: Date

  @Field()
  @prop({ required })
  course: string

  @Field(() => [User])
  @arrayProp({ itemsRef: User })
  voters: Ref<User>[]

  @Field()
  @prop({ required })
  idElectoralProcess: string
}
