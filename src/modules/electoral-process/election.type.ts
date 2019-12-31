import { Field, ID, ObjectType } from 'type-graphql'
import { ElectoralProcess } from './electoral-process.abstract'
import { prop, Ref } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { Candidate } from '../candidates/candidates.type'
import { User } from '../users/users.type'

@ObjectType()
export class Election extends ElectoralProcess {}

@ObjectType()
export class ElectionVote {
    @Field(() => ID)
  get id (this: any) {
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
