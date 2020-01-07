import { ReturnModelType } from '@typegoose/typegoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ColegiateBody } from './colegiate-bodies.type'
import { CollegiateBodyInput } from './colegiate-bodies.input'
import { CrudService } from '../../common/crud.service'

@Injectable()
export class ColegiateBodyService extends CrudService<
  ColegiateBody,
  CollegiateBodyInput
> {
  constructor(
    @InjectModel(ColegiateBody)
    private readonly colegiateBodyModel: ReturnModelType<typeof ColegiateBody>
  ) {
    super(colegiateBodyModel)
  }
}
