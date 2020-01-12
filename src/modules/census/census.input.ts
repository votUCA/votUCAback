import { Field, InputType } from 'type-graphql'

@InputType()
export class VoterInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  uid: string

  @Field()
  dni: string
}
@InputType()
export class CensusInput {
  @Field()
  group: string

  @Field()
  date: Date

  @Field()
  location: string

  @Field(() => VoterInput)
  voters: VoterInput[]
}
