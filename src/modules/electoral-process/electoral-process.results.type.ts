import { prop, Ref } from '@typegoose/typegoose'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { nullable, required } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { Census } from '../census/census.type'
import { Genre } from '../users/users.type'
import { Election } from './election.type'
import { Poll, PollOption } from './poll.type'

@ObjectType()
export class ElectionResults {
  @Field(() => Int)
  @prop({ default: 0 })
  votes: number

  @prop({ required })
  election: Ref<Election>

  @prop({ required })
  candidate: Ref<Candidate>

  @prop({ required })
  census: Ref<Census>

  @Field({ nullable })
  group?: string

  @Field({ nullable })
  location?: string

  @Field(() => Genre, { nullable })
  @prop({ required, enum: Object.keys(Genre), type: String })
  genre: Genre
}

@ObjectType()
export class PollResults {
  @Field(() => Int)
  @prop({ default: 0 })
  votes: number

  @prop({ required })
  poll: Ref<Poll>

  @prop({ required })
  option: Ref<PollOption>

  @prop({ required })
  census: Ref<Census>

  @Field({ nullable })
  group?: string

  @Field({ nullable })
  location?: string

  @Field(() => Genre, { nullable })
  @prop({ required, enum: Object.keys(Genre), type: String })
  genre: Genre
}

@InputType()
export class ResultsFilter {
  @Field({ defaultValue: false })
  group: boolean

  @Field({ defaultValue: false })
  location: boolean

  @Field({ defaultValue: false })
  genre: boolean
}

export const resultsFilterDefault: ResultsFilter = {
  group: false,
  location: false,
  genre: false,
}

@ObjectType({ isAbstract: true })
export class Results {
  @Field(() => Int, { description: 'Votantes habilitados' })
  voters: number

  @Field(() => Int, { description: 'Votos Emitidos' })
  votesCast: number

  @Field(() => Int, { description: 'Votos en blanco' })
  whiteVotes: number
}

@ObjectType()
export class ResultsForPoll extends Results {
  @Field(() => [PollResults])
  results: PollResults[]
}

@ObjectType()
export class ResultsForElection extends Results {
  @Field(() => [ElectionResults])
  results: ElectionResults[]
}
