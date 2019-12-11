import { Field, InputType } from 'type-graphql'

@InputType()
export class CensusInput {
  @Field()
  group: string

  @Field()
  place: string

  @Field(() => Date)
  date: Date

  @Field()
  course: string
}
