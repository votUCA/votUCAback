import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Election } from './election.type'
import { ElectoralProcessInput } from './electoral-process.abstract'
import { Census } from '../census/census.type'

@Injectable()
export class ElectionsService extends CrudService<
  Election,
  Omit<ElectoralProcessInput, 'censuses'> & { censuses: Omit<Census, 'id'>[] }
> {
  constructor (
    @InjectModel(Election)
    private readonly electionModel: ReturnModelType<typeof Election>
  ) {
    super(electionModel)
  }
}
