import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Census } from '../censuses/censuses.type'
import { CensusInput } from './censuses.input'

@Injectable()
export class CensusesService extends CrudService<Census, CensusInput> {
  constructor (
    @InjectModel(Census)
    private readonly censusModel: ReturnModelType<typeof Census>
  ) {
    super(censusModel)
  }
}
