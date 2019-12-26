import { InputType, Field, ID } from 'type-graphql'
import { ElectoralProcessInput } from './electoral-process.abstract'

@InputType()
export class PollInput extends ElectoralProcessInput {
  @Field()
  question: string

  @Field(() => [String])
  options: string[]
}

@InputType()
export class VotePollInput {
  @Field(() => ID)
  option: string

  @Field(() => ID)
  poll: string
}
