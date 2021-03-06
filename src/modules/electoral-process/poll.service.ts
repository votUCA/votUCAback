import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Poll, PollOption } from './poll.type'
import { ElectoralProcessInput } from './electoral-process.abstract'
import { Census } from '../census/census.type'

type PollDTO = Omit<ElectoralProcessInput, 'censuses'> & {
  censuses: Omit<Census, 'id'>[]
  options: Omit<PollOption, 'id'>[]
  secretary: string
}

@Injectable()
export class PollsService extends CrudService<Poll, PollDTO> {
  constructor(
    @InjectModel(Poll)
    private readonly pollModel: ReturnModelType<typeof Poll>
  ) {
    super(pollModel)
  }

  async findOption(id: Ref<PollOption>): Promise<PollOption> {
    const {
      options: [option],
    } = await this.pollModel.findOne({ 'options._id': id }, { 'options.$': 1 })
    return option
  }

  async findOneAndUpdate(conditions: any, update: any): Promise<Poll> {
    return this.pollModel.findOneAndUpdate(conditions, update)
  }

  async pendingPollsOfVoter(uid: string): Promise<Poll[]> {
    return this.pollModel.aggregate([
      {
        $lookup: {
          from: 'census',
          localField: 'censuses',
          foreignField: '_id',
          as: 'censuses',
        },
      },
      {
        $match: {
          'censuses.voters': {
            $elemMatch: { uid, hasVoted: false },
          },
          end: { $gte: new Date() },
        },
      },
    ])
  }

  async votersAndWhiteVotes(
    _id: string
  ): Promise<{ whiteVotes: number; voters: number }> {
    const [result] = await this.pollModel.aggregate([
      {
        $match: {
          _id,
        },
      },
      {
        $lookup: {
          from: 'census',
          localField: 'censuses',
          foreignField: '_id',
          as: 'censuses',
        },
      },
      {
        $unwind: {
          path: '$censuses',
        },
      },
      {
        $group: {
          _id: {
            whiteVotes: '$whiteVotes',
          },
          voters: {
            $sum: {
              $size: '$censuses.voters',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          whiteVotes: '$_id.whiteVotes',
          voters: '$voters',
        },
      },
    ])
    return result
  }
}
