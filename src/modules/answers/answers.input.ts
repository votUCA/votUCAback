<<<<<<< HEAD
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
=======
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
>>>>>>> develop
}
