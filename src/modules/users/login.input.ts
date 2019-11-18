import { InputType, Field } from 'type-graphql'
import { Validate } from 'class-validator'
import { UID } from '../../common/validators'
@InputType()
export class LoginInput {
  @Field()
  @Validate(UID)
  user: string

  @Field()
  password: string
}
