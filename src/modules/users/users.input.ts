import { Field, InputType } from 'type-graphql'
import { Validate } from 'class-validator'
import { Role } from './roles.enum'
import { UID } from '../../common/validators'
import { ColegiateBodyInput } from '../colegiate-bodies/colegiate-bodies.input'

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

  @Field(() => ColegiateBodyInput)
  collegiateBody: ColegiateBodyInput
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

  @Field(() => ColegiateBodyInput, { nullable: true })
  colegiateBody?: ColegiateBodyInput
}
