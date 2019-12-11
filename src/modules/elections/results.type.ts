import { Candidate } from '../candidates/candidates.type'
import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
export class ElectionResult {
  @Field(() => Candidate)
  candidate: Candidate

  @Field(() => Int)
  votes: number
}
