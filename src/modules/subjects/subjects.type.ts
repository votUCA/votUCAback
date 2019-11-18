import { ObjectType, Field, Int, ID } from 'type-graphql'

@ObjectType()
export class Subject {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  name: string

  @Field()
  degree: string

  @Field(() => Int)
  course: number
}
