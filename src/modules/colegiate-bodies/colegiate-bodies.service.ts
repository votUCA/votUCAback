import { ReturnModelType } from '@typegoose/typegoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ColegiateBody } from './colegiate-bodies.type'
import { ColegiateBodyInput } from './colegiate-bodies.input'
import { CrudService } from '../../common/crud.service'

@Injectable()
export class ColegiateBodyService extends CrudService<
  ColegiateBody,
  ColegiateBodyInput
> {
  constructor(
    @InjectModel(ColegiateBody)
    private readonly colegiateBodyModel: ReturnModelType<typeof ColegiateBody>
  ) {
    super(colegiateBodyModel)
  }
}
