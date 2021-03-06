import { ObjectType, Field, ID } from 'type-graphql'
import { Ref, prop } from '@typegoose/typegoose'
import { Election } from '../electoral-process/election.type'
import { required, nullable } from '../../common/constants'

@ObjectType()
export class Candidate {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string

  @Field({ nullable })
  @prop()
  about?: string

  @Field({ nullable })
  @prop()
  image?: string

  @prop({ required })
  election: Ref<Election>
}
