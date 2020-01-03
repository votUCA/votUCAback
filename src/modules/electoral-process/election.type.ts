import { Field, ID, ObjectType, ArgsType } from 'type-graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { ElectoralProcess } from './electoral-process.abstract'
import { required } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { User } from '../users/users.type'

@ObjectType()
export class Election extends ElectoralProcess {}

@ArgsType()
export class ElectionResultsArgs {
  @Field({ defaultValue: false })
  group: boolean

  @Field({ defaultValue: false })
  location: boolean

  @Field({ defaultValue: false })
  genre: boolean
}

@ObjectType()
export class ElectionVote {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field(() => ID)
  @prop({ required, ref: 'User' })
  user: Ref<User>

  @Field(() => ID)
  @prop({ required, ref: 'Election' })
  election: Ref<Election>

  @Field(() => ID)
  @prop({ required, ref: 'Candidate' })
  candidate: Ref<Candidate>
}
