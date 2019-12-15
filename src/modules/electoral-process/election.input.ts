import { Field, InputType } from 'type-graphql'
import { CandidateInput } from '../candidates/candidates.input'
import { ElectoralProcessInput } from './electoral-process.abstract'

@InputType()
export class ElectionInput extends ElectoralProcessInput {
  @Field(() => [CandidateInput])
  candidates: CandidateInput[]
}
