import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class File {
  @Field()
  name: string
}
