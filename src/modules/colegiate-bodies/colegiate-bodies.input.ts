import { InputType, Field } from 'type-graphql'
import { ColegiateBody } from './colegiate-bodies.type'

@InputType()
export class CollegiateBodyInput implements Partial<ColegiateBody> {
  @Field()
  name: string
}
