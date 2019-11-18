import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  uid: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
