import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Poll, PollOption, PollVote } from './poll.type'
import { User } from '../users/users.type'

interface PollVoteInput {
  poll: Ref<Poll> | string
  option: Ref<PollOption> | string
  user: Ref<User> | string
}

@Injectable()
export class PollVoteService extends CrudService<PollVote, PollVoteInput> {
  constructor(
    @InjectModel(PollVote)
    private readonly pollVoteModel: ReturnModelType<typeof PollVote>
  ) {
    super(pollVoteModel)
  }

  async findOneAndUpdate(conditions: any, update: any): Promise<PollVote> {
    return this.pollVoteModel.findOneAndUpdate(conditions, update)
  }
}
