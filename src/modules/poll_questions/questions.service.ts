import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { QuestionInput } from './questions.input'
import { Question } from './questions.type'

@Injectable()
export class QuestionService extends CrudService<Question, QuestionInput> {
  constructor (
    @InjectModel(Question)
    private readonly questionModel: ReturnModelType<typeof Question>
  ) {
    super(questionModel)
  }
}
