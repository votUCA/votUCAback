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
}

@Injectable()
export class PollsService extends CrudService<Poll, PollDTO> {
  constructor (
    @InjectModel(Poll)
    private readonly pollModel: ReturnModelType<typeof Poll>
  ) {
    super(pollModel)
  }

  async findOption (id: Ref<PollOption>): Promise<PollOption> {
    const {
      options: [option]
    } = await this.pollModel.findOne({ 'options._id': id }, { 'options.$': 1 })
    return option
  }

  async findOneAndUpdate (conditions: any, update: any) {
    return this.pollModel.findOneAndUpdate(conditions, update)
  }
}
