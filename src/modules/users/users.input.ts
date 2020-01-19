import { Validate } from 'class-validator'
import { Field, ID, InputType } from 'type-graphql'
import { UID } from '../../common/validators'
import { Role } from './roles.enum'
import { Genre } from './users.type'

@InputType()
export class UserInput {
  @Field()
  @Validate(UID)
  uid: string

  @Field()
  dni: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => [Role], { defaultValue: [] })
  roles: [Role]

  @Field(() => ID)
  colegiateBody: string

  @Field(() => Genre)
  genre: Genre
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

  @Field(() => ID, { nullable: true })
  colegiateBody?: string

  @Field(() => Genre, { nullable: true })
  genre?: Genre
}
