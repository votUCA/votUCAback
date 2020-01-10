import { InputType, Field } from 'type-graphql'
import { ColegiateBody } from './colegiate-bodies.type'

@InputType()
export class ColegiateBodyInput implements Partial<ColegiateBody> {
  @Field()
  name: string
}
