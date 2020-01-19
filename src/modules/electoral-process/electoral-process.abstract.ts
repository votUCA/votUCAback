import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { Field, ID, InputType, ObjectType, ArgsType, Int } from 'type-graphql'
import { isAbstract, required } from '../../common/constants'
import { CensusInput } from '../census/census.input'
import { Census } from '../census/census.type'
import { User } from '../users/users.type'
import { UserInput } from '../users/users.input'

@ObjectType({ isAbstract })
export class ElectoralProcess {
  @Field(() => ID)
  get id(this: any): string {
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

  @arrayProp({ required, itemsRef: User })
  delegates: Ref<User>[]

  @Field(() => Int)
  @prop({ required })
  maxVotes: number

  @prop({ default: 0 })
  whiteVotes?: number

  @prop({ required, ref: User })
  secretary: Ref<User>
}

@InputType({ isAbstract })
export class ElectoralProcessInput {
  @Field(() => Date)
  start: Date

  @Field(() => Date)
  end: Date

  @Field()
  description: string

  @Field(() => [CensusInput])
  censuses: CensusInput[]

  @Field(() => [ID])
  delegates: string[]

  @Field(() => Int, { defaultValue: 1 })
  maxVotes: number
}

@InputType({ isAbstract })
export class UpdateElectoralProcessInput {
  @Field({ nullable: true })
  start?: Date

  @Field({ nullable: true })
  end?: Date

  @Field({ nullable: true })
  description?: string

  @Field(() => [CensusInput], { nullable: true })
  censuses?: CensusInput[]

  @Field(() => [UserInput], { nullable: true })
  delegates?: UserInput[]
}

@ArgsType()
export class ElectoralProcessFilter {
  @Field({ defaultValue: false })
  open: boolean

  @Field({ defaultValue: false })
  finished: boolean
}
