import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  user: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
