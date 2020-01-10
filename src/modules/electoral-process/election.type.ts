import { Inject } from '@nestjs/common'
import { post, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { required } from '../../common/constants'
import { CandidatesService } from '../candidates/candidates.service'
import { Candidate } from '../candidates/candidates.type'
import { CensusService } from '../census/census.service'
import { User } from '../users/users.type'
import { ElectoralProcess } from './electoral-process.abstract'
import { ElectionResultsService } from './election.results.service'

class ElectionDeleter {
  @Inject(CandidatesService)
  public static readonly candidateService: CandidatesService

  @Inject(CensusService)
  public static readonly censusService: CensusService

  @Inject(ElectionResultsService)
  public static readonly electionResultService: ElectionResultsService
}

@ObjectType()
@post<Election>('remove', async election => {
  await ElectionDeleter.candidateService.deleteByElection(election)
  await ElectionDeleter.censusService.deleteAllIn(election.censuses)
  await ElectionDeleter.electionResultService.deleteByElection(election)
})
export class Election extends ElectoralProcess {}

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
