import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { ElectionResults } from './electoral-process.results.type'
import { Election } from './election.type'
import { Candidate } from '../candidates/candidates.type'
import { Census } from '../census/census.type'

interface ElectionResultsInput {
  votes?: number
  election: Ref<Election> | string
  candidate: Ref<Candidate> | string
  census: Ref<Census> | string
}

@Injectable()
export class ElectionResultsService extends CrudService<
  ElectionResults,
  ElectionResultsInput
> {
  constructor (
    @InjectModel(ElectionResults)
    private readonly electionResultModel: ReturnModelType<
      typeof ElectionResults
    >
  ) {
    super(electionResultModel)
  }

  async groupResults (idElection: string, group: boolean, location: boolean) {
    const groupby = { candidate: '$candidate' }
    if (group) {
      /*eslint-disable*/
      groupby['group'] = '$census.group'
      /* eslint-enable */
    }
    if (location) {
      /*eslint-disable*/
      groupby['location'] = '$census.location'
      /* eslint-enable */
    }
    return this.electionResultModel.aggregate([
      {
        $match: {
          election: idElection
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
          candidate: '$_id.candidate',
          group: '$_id.group',
          location: '$_id.location'
        }
      }
    ])
  }

  async findOneAndUpdate (conditions: any, update: any) {
    return this.electionResultModel.findOneAndUpdate(conditions, update)
  }
}
