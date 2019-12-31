import { arrayProp, prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType, ArgsType } from 'type-graphql'
import { required } from '../../common/constants'
import { ElectoralProcess } from './electoral-process.abstract'

@ObjectType()
export class PollOption {
  @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  text: string
}

@ObjectType()
export class Poll extends ElectoralProcess {
  @Field()
  @prop({ required })
  question: string

  @Field(() => [PollOption])
  @arrayProp({ items: PollOption, required })
  options: PollOption[]
}

@ArgsType()
export class PollResultsArgs {
    @Field({ defaultValue: false })
    group: boolean

    @Field({ defaultValue: false })
    location: boolean
}
