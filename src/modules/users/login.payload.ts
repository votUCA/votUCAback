import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class LoginPayload {
  @Field()
  accessToken: string
}
