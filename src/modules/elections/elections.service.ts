import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { ElectionInput } from '../elections/elections.input'
import { Election } from '../elections/elections.type'

@Injectable()
export class ElectionsService extends CrudService<Election, ElectionInput> {
  constructor (
    @InjectModel(Election)
    private readonly electionModel: ReturnModelType<typeof Election>
  ) {
    super(electionModel)
  }
}
