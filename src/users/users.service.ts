import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ReturnModelType } from '@typegoose/typegoose/lib/types'
import { CrudService } from '../common/crud.service'
import { UserInput } from './users.input'
import { User } from './users.model'

@Injectable()
export class UsersService extends CrudService<User, UserInput> {
  constructor (
    @InjectModel(User.name)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel)
  }
}
