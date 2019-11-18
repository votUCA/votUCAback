import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { User } from './users.type'

@Injectable()
export class UsersService extends CrudService<User, any> {
  constructor (
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel)
  }
}
