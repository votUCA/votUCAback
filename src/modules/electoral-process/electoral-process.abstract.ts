import { Field, ID, ObjectType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { required } from '../../common/constants'

@ObjectType({ isAbstract: true })
export class ElectoralProcessBase {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  idSecretary: string

  @Field()
  @prop({ required })
  censusFile: string

  @Field(() => Int)
  @prop({ required })
  tableMember: number

  @Field(() => Date)
  @prop({ required })
  startTime: Date

  @Field(() => Date)
  @prop({ required })
  endTime: Date

  @Field()
  @prop({ required })
  correctVote: boolean
}
