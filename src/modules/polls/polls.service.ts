import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { PollInput } from './polls.input'
import { Poll } from './polls.type'

@Injectable()
export class PollsService extends CrudService<Poll, PollInput> {
  constructor (
    @InjectModel(Poll)
    private readonly pollModel: ReturnModelType<typeof Poll>
  ) {
    super(pollModel)
  }
}
