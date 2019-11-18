import { Field, Int, InputType } from 'type-graphql'

@InputType()
export class ElectionInput {
  @Field(() => [String])
  candidate: string[]

  @Field(() => [Int])
  electionsAnswers: number[]

  @Field()
  voteOtherGroup: boolean

  @Field(() => Int)
  nVotes: number

  @Field(() => [Int])
  votesAnswers: number[]
}
