import { Field, InputType } from 'type-graphql'
import { Role } from './roles.enum'
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

  @Field(() => [Role], { defaultValue: [] })
  roles?: [Role]
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
}
