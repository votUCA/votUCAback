import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref, DocumentType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Election, ElectionVote } from './election.type'
import { Candidate } from '../candidates/candidates.type'
import { User } from '../users/users.type'

interface ElectionVoteInput {
  votes?: number
  election: Ref<Election> | string
  candidate: Ref<Candidate> | string
  user: Ref<User> | string
}

@Injectable()
export class ElectionVotesService extends CrudService<
  ElectionVote,
  ElectionVoteInput
> {
  constructor(
    @InjectModel(ElectionVote)
    private readonly electionVoteModel: ReturnModelType<typeof ElectionVote>
  ) {
    super(electionVoteModel)
  }

  async findOneAndUpdate(
    conditions: any,
    update: any
  ): Promise<DocumentType<ElectionVote>> {
    return this.electionVoteModel.findOneAndUpdate(conditions, update)
  }
}
