import { buildSchema, prop as Property } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  @Property({ required: true })
  uid: string

  @Property({ required: true })
  password: string
}

export const UserSchema = buildSchema(User)
