import { InputType, Field, ID } from 'type-graphql'
import { ElectoralProcessInput, UpdateElectoralProcessInput } from './electoral-process.abstract'
import { nullable } from '../../common/constants'

@InputType()
export class PollInput extends ElectoralProcessInput {
  @Field()
  question: string

  @Field(() => [String])
  options: string[]

  @Field()
  numVotesAllowed: number

  @Field()
  realTime: boolean
}

@InputType()
export class UpdatePollInput extends UpdateElectoralProcessInput {
  @Field({ nullable: true })
  question?: string

  @Field(() => [String], { nullable: true })
  options?: string[]
}

@InputType()
export class VotePollInput {
  @Field(() => ID)
  option: string

  @Field(() => ID)
  poll: string

  // Rellenar si rectifica voto
  @Field(() => ID, { nullable })
  rectifiedVote?: string
}
