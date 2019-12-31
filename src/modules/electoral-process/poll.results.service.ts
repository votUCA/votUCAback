import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { PollResults } from './electoral-process.results.type'
import { Poll, PollOption } from './poll.type'
import { Census } from '../census/census.type'

interface PollResultsInput {
  votes?: number
  poll: Ref<Poll> | string
  option: Ref<PollOption> | string
  census: Ref<Census> | string
}

@Injectable()
export class PollResultsService extends CrudService<
  PollResults,
  PollResultsInput
> {
  constructor (
    @InjectModel(PollResults)
    private readonly pollResultModel: ReturnModelType<typeof PollResults>
  ) {
    super(pollResultModel)
  }

  async groupResults (idPoll: string, group: boolean, location: boolean) {
    const groupby = { option: '$option' }
    if (group) {
      groupby.group = '$census.group'
    }
    if (location) {
      groupby.location = '$census.location'
    }
    return this.pollResultModel.aggregate([
      {
        $match: {
          poll: idPoll
        }
      }, {
        $lookup: {
          from: 'census',
          localField: 'census',
          foreignField: '_id',
          as: 'census'
        }
      }, {
        $unwind: {
          path: '$census'
        }
      }, {
        $group: {
          _id: groupby,
          votes: {
            $sum: '$votes'
          }
        }
      }, {
        $project: {
          votes: 1,
          _id: 0,
          option: '$_id.option',
          group: '$_id.group',
          location: '$_id.location'
        }
      }
    ])
  }

  async findOneAndUpdate (conditions: any, update: any) {
    return this.pollResultModel.findOneAndUpdate(conditions, update)
  }
}
