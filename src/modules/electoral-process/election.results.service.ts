import { Injectable } from '@nestjs/common'
import { ReturnModelType, Ref } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { ElectionResults } from './electoral-process.results.type'
import { Election } from './election.type'
import { Candidate } from '../candidates/candidates.type'

interface ElectionResultsInput {
  votes: number
  election: Ref<Election> | string
  candidate: Ref<Candidate> | string
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
}
