import { User } from './users.type'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Professor extends User {
  @Field()
  hasPhd: boolean

  @Field()
  isPermanent: boolean
}
