import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { ElectoralProcessBase } from '../electoral-process/electoral-process.abstract'

@ObjectType()
export class Poll extends ElectoralProcessBase {
  @Field()
  @prop({ required })
  presencial: boolean

  @Field()
  @prop({ required })
  canEdit: boolean

  @Field()
  @prop({ required })
  isSecret: boolean
}
