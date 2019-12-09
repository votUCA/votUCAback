import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { PosibleAnswerInput } from './posibleAnswers.input'
import { PosibleAnswer } from './posibleAnswers.type'

@Injectable()
export class PosibleAnswerService extends CrudService<PosibleAnswer, PosibleAnswerInput> {
  constructor (
    @InjectModel(PosibleAnswer)
    private readonly posibleAnswerModel: ReturnModelType<typeof PosibleAnswer>
  ) {
    super(posibleAnswerModel)
  }
}
