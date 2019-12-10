import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ElectionInput {
  @Field()
  voteOtherGroup: boolean

  @Field(() => Int)
  nVotes: number
}
