import { prop } from '@typegoose/typegoose'
import { Field, InputType } from 'type-graphql'
import { required } from '../../common/constants'

@InputType()
export class AnswerInput {
  @Field()
  @prop({ required })
  idCandidate?: string

  @Field()
  @prop({ required })
  idPosibleAnswer?: string
}
