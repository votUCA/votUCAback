import { InputType, Field } from 'type-graphql'

@InputType()
export class LoginInput {
  @Field()
  user: string

  @Field()
  password: string
}
