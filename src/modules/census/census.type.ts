import { ObjectType, Field, ID } from 'type-graphql'
import { prop, arrayProp } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType()
export class Voter {
  @prop({ default: false })
  hasVoted: boolean

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string

  @Field()
  @prop({ required })
  uid: string

  @Field()
  @prop({ required })
  dni: string
}

@ObjectType()
export class Census {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  group: string

  @Field()
  @prop({ type: Date, required })
  date: Date

  @Field()
  @prop({ required })
  location: string

  @Field(() => [Voter])
  @arrayProp({ _id: false, items: Voter, required })
  voters: Voter[]

  @prop({ required })
  filePath: string
}
