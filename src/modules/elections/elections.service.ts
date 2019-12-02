import { Injectable } from '@nestjs/common'
import { ElectionInput } from '../elections/elections.input'
import { CrudService } from '../../common/crud.service'
import { Election } from '../elections/elections.type'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

@Injectable()
export class ElectionsService extends CrudService<Election, ElectionInput> {
  constructor (
    @InjectModel(Election)
    private readonly electionModel: ReturnModelType<typeof Election>
  ) {
    super(electionModel)
  }
}
