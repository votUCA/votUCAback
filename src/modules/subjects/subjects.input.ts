import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class SubjectInput {
  @Field()
  name: string

  @Field()
  degree: string

  @Field(() => Int)
  course: number
}
