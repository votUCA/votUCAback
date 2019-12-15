import { Field, InputType } from 'type-graphql'
import { RoleType, Roles } from './roles.enum'
import { Validate } from 'class-validator'
import { UID } from '../../common/validators'

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

  @Field(() => [Roles], { defaultValue: [] })
  roles?: [RoleType]
}
