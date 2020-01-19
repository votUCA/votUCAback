import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { PollResults, ResultsFilter } from './electoral-process.results.type'
import { Poll, PollOption } from './poll.type'
import { Census } from '../census/census.type'
import { DeleteMany } from '../../common/delete-many'

interface PollResultsInput {
  votes?: number
  poll: Ref<Poll> | string
  option: Ref<PollOption> | string
  census: Ref<Census> | string
  genre: string
}

@Injectable()
export class PollResultsService extends CrudService<
  PollResults,
  PollResultsInput
> {
  constructor(
    @InjectModel(PollResults)
    private readonly pollResultModel: ReturnModelType<typeof PollResults>
  ) {
    super(pollResultModel)
  }

  async groupResults(
    idPoll: string,
    { group, location, genre }: ResultsFilter
  ): Promise<PollResults[]> {
    const groupby: { [key: string]: string } = { option: '$option' }
    if (group) {
      groupby.group = '$census.group'
    }
    if (location) {
      groupby.location = '$census.location'
    }
    if (genre) {
      groupby.genre = '$genre'
    }

    return this.pollResultModel.aggregate([
      {
        $match: {
          poll: idPoll,
        },
      },
      {
        $lookup: {
          from: 'census',
          localField: 'census',
          foreignField: '_id',
          as: 'census',
        },
      },
      {
        $unwind: {
          path: '$census',
        },
      },
      {
        $group: {
          _id: groupby,
          votes: {
            $sum: '$votes',
          },
        },
      },
      {
        $project: {
          votes: 1,
          _id: 0,
          option: '$_id.option',
          group: '$_id.group',
          location: '$_id.location',
          genre: '$_id.genre',
        },
      },
    ])
  }

  async updateMany(conditions: any, update: any): Promise<any> {
    return this.pollResultModel.updateMany(conditions, update)
  }

  async deleteByPoll(poll: string | Ref<Poll>): Promise<DeleteMany> {
    return this.pollResultModel.deleteMany({ poll })
  }
}
