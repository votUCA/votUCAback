import { Field, InputType } from 'type-graphql'

@InputType()
export class CensusInput {
  @Field()
  group: string

  @Field()
  date: Date

  @Field()
  location: string

  @Field()
  file: string
}
