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
  genre: string
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
  async groupResults (idElection: string, group: boolean, location: boolean, genre: boolean) {
    const groupby: {[key: string]: string} = { candidate: '$candidate' }
    if (group) {
      groupby.group = '$census.group'
    }
    if (location) {
      groupby.location = '$census.location'
    }
    if (genre) {
      groupby.genre = '$genre'
    }
    return this.electionResultModel.aggregate([
      {
        $match: {
          election: idElection
        }
      },
      {
        $lookup: {
          from: 'census',
          localField: 'census',
          foreignField: '_id',
          as: 'census'
        }
      },
      {
        $unwind: {
          path: '$census'
        }
      },
      {
        $group: {
          _id: groupby,
          votes: {
            $sum: '$votes'
          }
        }
      },
      {
        $project: {
          votes: 1,
          _id: 0,
          candidate: '$_id.candidate',
          group: '$_id.group',
          location: '$_id.location',
          genre: '$_id.genre'
        }
      }
    ])
  }

  async findOneAndUpdate (conditions: any, update: any) {
    return this.electionResultModel.findOneAndUpdate(conditions, update)
  }
}
