import { Field, InputType } from 'type-graphql'

@InputType()
export class PollInput {
  @Field()
  presencial: boolean

  @Field()
  canEdit: boolean

  @Field()
  isSecret: boolean
}
