import { ObjectType, Field, ID } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class ColegiateBody {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  name: string
}
