import { Field, Int, InputType } from 'type-graphql'

@InputType()
export class ElectoralProcessInput {
  @Field()
  idSecretary: string

  @Field()
  censusFile: string

  @Field(() => Int)
  tableMember: number

  @Field(() => Date)
  startTime: Date

  @Field(() => Date)
  endTime: Date

  @Field()
  correctVote: boolean
}
