import { Field, ID, ObjectType } from 'type-graphql'
import { ElectoralProcess } from './electoral-process.abstract'
import { prop, Ref } from '@typegoose/typegoose'
import { required } from '../../common/constants'
import { Voter } from '../census/census.type'
import { Candidate } from '../candidates/candidates.type'

@ObjectType()
export class Election extends ElectoralProcess {}

@ObjectType()
export class ElectionVote {
    @Field(() => ID)
  get id (this: any) {
    return this._id || this._doc._id
  }

    @prop({ required, ref: 'Voter' })
    voter: Ref<Voter>

    @prop({ required, ref: 'Election' })
    election: Ref<Election>

    @prop({ required, ref: 'Candidate' })
    candidate: Ref<Candidate>
}
