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

  async findOneAndUpdate (conditions: any, update: any) {
    return this.electionResultModel.findOneAndUpdate(conditions, update)
  }
}
