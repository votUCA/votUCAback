import { Field, ObjectType } from 'type-graphql'
import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { User } from '../users/users.type'

@ObjectType()
export class Census {
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

  @Field()
  @arrayProp({ itemsRef: User })
  voters: Ref<User>[]
}
