import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { isAbstract, required } from '../../common/constants'
import { CensusInput } from '../census/census.input'
import { Census } from '../census/census.type'

@ObjectType({ isAbstract })
export class ElectoralProcess {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field(() => Date)
  @prop({ type: Date, required })
  start: Date

  @Field(() => Date)
  @prop({ type: Date, required })
  end: Date

  @Field()
  @prop({ required })
  description: string

  @arrayProp({ required, itemsRef: Census })
  censuses: Ref<Census>[]

  @Field()
  @prop({ required })
  rectifyVote: boolean
}

@InputType({ isAbstract })
export class ElectoralProcessInput {
  @Field(() => Date)
  start: Date

  @Field(() => Date)
  end: Date

  @Field()
  description: string

  @Field()
  rectifyVote: boolean

  @Field(() => [CensusInput])
  censuses: CensusInput[]
}
