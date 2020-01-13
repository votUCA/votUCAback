import { Field, ID, InputType } from 'type-graphql'
import { CandidateInput } from '../candidates/candidates.input'
import {
  ElectoralProcessInput,
  UpdateElectoralProcessInput,
} from './electoral-process.abstract'
import { VoteWeight } from './election.type'

@InputType()
export class ElectionInput extends ElectoralProcessInput {
  @Field(() => [CandidateInput])
  candidates: CandidateInput[]

  @Field(() => [VoteWeight], { defaultValue: [] })
  voteWeights: VoteWeight[]
}

@InputType()
export class UpdateElectionInput extends UpdateElectoralProcessInput {
  @Field(() => [CandidateInput], { nullable: true })
  candidates?: CandidateInput[]
}

@InputType()
export class VoteElectionInput {
  @Field(() => [ID])
  candidates: string[]

  @Field(() => ID)
  election: string
}
