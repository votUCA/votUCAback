import { Field, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@InputType()
export class AnswerInput {
  @Field(() => String)
  @prop()
  idElectoralProcess: string

  @Field(() => String, { nullable: true })
  @prop()
  idPosibleAnswer?: string

  @Field(() => String, { nullable: true })
  @prop()
  idCandidate?: string

  @Field(() => String, { nullable: true })
  @prop()
  idRectifiedAnswer?: string
}
