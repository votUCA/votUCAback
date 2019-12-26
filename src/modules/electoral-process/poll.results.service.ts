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

  async findOneAndUpdate (conditions: any, update: any) {
    return this.pollResultModel.findOneAndUpdate(conditions, update)
  }
}
