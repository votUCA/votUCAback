import { Field, InputType } from 'type-graphql'

@InputType()
export class CollegiateBodyInput {
  @Field()
  name: string
}

@InputType()
export class CollegiateBodyUserAssignInput {
  @Field(() => String)
  collegiateBodyId: string

  @Field(() => String)
  userId: string
}
