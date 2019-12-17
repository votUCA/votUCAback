import { Field, ObjectType, Int } from 'type-graphql'
import { Election } from '../elections/elections.type'

@ObjectType()
export class RemainingVotes {
  @Field(() => Election)
  election: Election

  @Field(() => Int)
  votes: number
}
