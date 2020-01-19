import { Injectable } from '@nestjs/common'
import { Ref, ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { DeleteMany } from '../../common/delete-many'
import { Candidate } from '../candidates/candidates.type'
import { Census } from '../census/census.type'
import { Election } from './election.type'
import {
  ElectionResults,
  ResultsFilter,
} from './electoral-process.results.type'

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
  constructor(
    @InjectModel(ElectionResults)
    private readonly electionResultModel: ReturnModelType<
      typeof ElectionResults
    >
  ) {
    super(electionResultModel)
  }

  async groupResults(
    idElection: string,
    { group, location, genre }: ResultsFilter
  ): Promise<ElectionResults[]> {
    const groupby: { [key: string]: string } = { candidate: '$candidate' }
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
          election: idElection,
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
          candidate: '$_id.candidate',
          group: '$_id.group',
          location: '$_id.location',
          genre: '$_id.genre',
        },
      },
    ])
  }

  async updateMany(conditions: any, update: any): Promise<any> {
    return this.electionResultModel.updateMany(conditions, update)
  }

  async deleteByElection(
    election: string | Ref<Election>
  ): Promise<DeleteMany> {
    return this.electionResultModel.deleteMany({ election })
  }
}
