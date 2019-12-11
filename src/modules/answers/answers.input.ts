import { Field, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@InputType()
export class AnswerInput {
  @Field(() => String, { nullable: true })
  @prop()
  idPosibleAnswer?: string

  @Field(() => String, { nullable: true })
  @prop()
  idCandidate?: string
}
