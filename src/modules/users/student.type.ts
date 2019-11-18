import { User } from './users.type'
import { ObjectType, Int, Field } from 'type-graphql'
import { Subject } from '../subjects/subjects.type'

@ObjectType()
export class Student extends User {
  @Field(() => Int)
  course: number

  @Field(() => [Subject])
  subjects: Subject[]
}
