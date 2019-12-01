
import { Field, InputType } from 'type-graphql'

@InputType()
export class RoleInput {
  @Field()
  name: string
}
