import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Election } from './election.type'
import { ElectoralProcessInput } from './electoral-process.abstract'
import { Census } from '../census/census.type'

@Injectable()
export class ElectionsService extends CrudService<
  Election,
  Omit<ElectoralProcessInput, 'censuses'> & {
    censuses: Omit<Census, 'id'>[]
    secretary: string
  }
> {
  constructor(
    @InjectModel(Election)
    private readonly electionModel: ReturnModelType<typeof Election>
  ) {
    super(electionModel)
  }

  async pendingElectionsOfVoter(uid: string): Promise<Election[]> {
    return this.electionModel.aggregate([
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
    const [result] = await this.electionModel.aggregate([
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
