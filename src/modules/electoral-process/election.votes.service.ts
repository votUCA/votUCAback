import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
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
  constructor (
    @InjectModel(ElectionVote)
    private readonly electionVoteModel: ReturnModelType<
      typeof ElectionVote
    >
  ) {
    super(electionVoteModel)
  }

  async findOneAndUpdate (conditions: any, update: any) {
    return this.electionVoteModel.findOneAndUpdate(conditions, update)
  }

  async findUserVotes (user: User, election: Election) {
    return this.findAll({ user: user, election: election })
  }
}
