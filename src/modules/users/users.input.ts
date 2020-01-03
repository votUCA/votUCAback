import { Field, InputType } from 'type-graphql'
import { Role } from './roles.enum'
import { Validate } from 'class-validator'
import { UID } from '../../common/validators'
import { CollegiateBodyInput } from '../collegiate-bodies/collegiate-bodies.input'

@InputType()
export class UserInput {
  @Field()
  @Validate(UID)
  uid: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => [Role], { defaultValue: [] })
  roles?: [Role]

  @Field(() => CollegiateBodyInput)
  collegiateBody: CollegiateBodyInput
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field(() => [Role], { nullable: true })
  roles?: [Role]

  @Field(() => CollegiateBodyInput, { nullable: true })
  collegiateBody?: CollegiateBodyInput
}
