import { Field, InputType } from 'type-graphql'

@InputType()
export class QuestionInput {
  @Field()
  question: string

  @Field()
  idPoll: string
}
