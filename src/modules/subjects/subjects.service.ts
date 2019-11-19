import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Subject } from './subjects.type'
import { CrudService } from '../../common/crud.service'
import { ReturnModelType } from '@typegoose/typegoose'
import { SubjectInput } from './subjects.input'

@Injectable()
export class SubjectsService extends CrudService<Subject, SubjectInput> {
  constructor (
    @InjectModel(Subject)
    private readonly subjectModel: ReturnModelType<typeof Subject>
  ) {
    super(subjectModel)
  }
}
