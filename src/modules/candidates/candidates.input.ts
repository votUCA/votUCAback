import { Field, InputType } from 'type-graphql'
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
