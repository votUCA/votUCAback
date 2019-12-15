import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Census } from './census.type'
import { CensusInput } from './census.input'

@Injectable()
export class CensusService extends CrudService<Census, CensusInput> {
  constructor (
    @InjectModel(Census)
    private readonly censusModel: ReturnModelType<typeof Census>
  ) {
    super(censusModel)
  }

  async create (data: any) {
    return this.censusModel.create(data)
  }
}
