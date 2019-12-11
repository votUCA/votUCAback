import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'

@ObjectType()
export class Census {
  @Field()
  @prop({ required })
  name: string

  @Field()
  @prop({ required })
  lastName1: string

  @Field()
  @prop({ required })
  lastName2: string

  @Field()
  @prop({ required })
  center: string

  @Field(() => Date)
  @prop({ required })
  startTime: Date

  @Field()
  @prop({ required })
  uid: string // 4_digits

  @Field()
  @prop({ required })
  isVoted: boolean

  @Field(() => String)
  @prop({ required })
  id_electoralProcess: string
}
