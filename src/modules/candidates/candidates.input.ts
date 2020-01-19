import { ArgsType, Field, ID, InputType } from 'type-graphql'
import { nullable } from '../../common/constants'

@InputType()
export class CandidateInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable })
  about?: string
}

@ArgsType()
export class CandidateDeleteArgs {
  @Field(() => ID)
  id: string

  @Field(() => ID)
  election: string
}
