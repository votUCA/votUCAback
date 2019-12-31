import { InputType, Field, ID } from 'type-graphql'
import { ElectoralProcessInput } from './electoral-process.abstract'

@InputType()
export class PollInput extends ElectoralProcessInput {
  @Field()
  question: string

  @Field(() => [String])
  options: string[]

  @Field()
  numVotesAllowed: number
}

@InputType()
export class VotePollInput {
  @Field(() => ID)
  option: string

  @Field(() => ID)
  poll: string

  // Rellenar si rectifica voto
  @Field(() => ID)
  rectifiedVote: string
}
