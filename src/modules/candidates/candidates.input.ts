import { Field, InputType } from 'type-graphql'

@InputType()
export class CandidateInput {
  @Field()
  name: string

  @Field()
  idElection: string
}
