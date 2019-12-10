import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { AnswerInput } from './answers.input'
import { Answer } from './answers.type'

@Injectable()
export class AnswersService extends CrudService<Answer, AnswerInput> {
  constructor (
    @InjectModel(Answer)
    private readonly answerModel: ReturnModelType<typeof Answer>
  ) {
    super(answerModel)
  }
}
