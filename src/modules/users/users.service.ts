import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { UserInput } from './users.input'
import { User } from './users.type'

@Injectable()
export class UsersService extends CrudService<User, UserInput> {
  constructor (
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel)
  }
}
