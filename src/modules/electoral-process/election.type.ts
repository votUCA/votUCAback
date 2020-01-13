import { prop, Ref, arrayProp } from '@typegoose/typegoose'
import { Field, ID, ObjectType, InputType } from 'type-graphql'
import { required } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { User } from '../users/users.type'
import { ElectoralProcess } from './electoral-process.abstract'

@ObjectType()
@InputType('VoteWeightInput')
export class VoteWeight {
  @Field()
  @prop({ required })
  group: string

  @Field()
  @prop({ required })
  weight: number
}

@ObjectType()
export class Election extends ElectoralProcess {
  @Field(() => [VoteWeight])
  @arrayProp({ items: VoteWeight, default: [] })
  voteWeights: VoteWeight[]
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
