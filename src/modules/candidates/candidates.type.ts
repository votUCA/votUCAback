import { prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'

@ObjectType()
export class Candidate {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  name: string

  @Field()
  @prop({ required })
  idElection: string
}
