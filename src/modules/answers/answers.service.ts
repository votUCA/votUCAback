import { Injectable, BadRequestException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { AnswerInput } from './answers.input'
import { Answer } from './answers.type'
import { ElectionsService } from '../elections/elections.service'
import { PollsService } from '../polls/polls.service'

@Injectable()
export class AnswerService extends CrudService<Answer, AnswerInput> {
  constructor (
    @InjectModel(Answer)
    private readonly AnswerModel: ReturnModelType<typeof Answer>,
    private readonly electionsService: ElectionsService,
    private readonly pollsService: PollsService
  ) {
    super(AnswerModel)
  }

  async create (data: AnswerInput) {
    if (data.idCandidate === undefined && data.idPosibleAnswer === undefined) { throw new BadRequestException('idCandidate or idPosibleAnswer must be set') }

    if (data.idPosibleAnswer !== undefined) {

    }

    return super.create(data)
  }
}
