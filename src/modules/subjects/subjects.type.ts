import { ObjectType, Field, Int, ID } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class Subject {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  name: string

  @Field()
  @prop({ required })
  degree: string

  @Field(() => Int)
  @prop({ required })
  course: number
}
