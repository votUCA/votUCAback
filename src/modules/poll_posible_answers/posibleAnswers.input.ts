import { Field, InputType } from 'type-graphql'

@InputType()
export class PosibleAnswerInput {
  @Field()
  posibleAnswer: string

  @Field()
  idQuestion: string
}
