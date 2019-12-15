import { Field, InputType, ID } from 'type-graphql'
import { CandidateInput } from '../candidates/candidates.input'
import { ElectoralProcessInput } from './electoral-process.abstract'

@InputType()
export class ElectionInput extends ElectoralProcessInput {
  @Field(() => [CandidateInput])
  candidates: CandidateInput[]
}

@InputType()
export class VoteInput {
  @Field(() => ID)
  candidate: string

  @Field(() => ID)
  election: string
}
