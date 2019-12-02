import { Field, Int, InputType } from 'type-graphql'

@InputType()
export class PollInput {
  @Field()
  question: string

  @Field(() => [String])
  answers: string[]

  @Field()
  presencial: boolean

  @Field()
  canEdit: boolean

  @Field()
  isSecret: boolean

  @Field(() => [Int])
  votesAnswer: number[]
}
