import { Injectable } from '@nestjs/common'
import { CrudService } from '../../common/crud.service'
import { ElectoralProcess } from './electoral-process.type'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { ElectoralProcessInput } from './electoral-process.input'

@Injectable()
export class ElectoralProcessService extends CrudService<ElectoralProcess, ElectoralProcessInput> {
  constructor (
    @InjectModel(ElectoralProcess)
    private readonly electoralprocessModel: ReturnModelType<typeof ElectoralProcess>
  ) {
    super(electoralprocessModel)
  }
}
