import { Field, InputType } from 'type-graphql'

@InputType()
export class CensusInput {
  @Field()
  name: string

  @Field()
  lastName1: string

  @Field()
  lastName2: string

  @Field()
  center: string

  @Field(() => Date)
  startTime: Date

  @Field()
  uid: string // 4_digits

  @Field()
  isVoted: boolean

  @Field(() => String)
  id_electoralProcess: string
}
