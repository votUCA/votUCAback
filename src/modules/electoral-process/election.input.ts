import { Field, InputType, ID } from 'type-graphql'
import { CandidateInput } from '../candidates/candidates.input'
import { ElectoralProcessInput, UpdateElectoralProcessInput } from './electoral-process.abstract'

@InputType()
export class ElectionInput extends ElectoralProcessInput {
  @Field(() => [CandidateInput])
  candidates: CandidateInput[]
}

@InputType()
export class UpdateElectionInput extends UpdateElectoralProcessInput {
  @Field(() => [CandidateInput], { nullable: true })
  candidates?: CandidateInput[]
}

@InputType()
export class VoteElectionInput {
  @Field(() => ID)
  candidate: string

  @Field(() => ID)
  election: string
}
