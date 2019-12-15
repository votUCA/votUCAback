import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { LoginInput } from './login.input'
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

  async findByUid (uid: string) {
    return this.userModel.findOne({ uid })
  }

  async create ({ password, ...rest }: UserInput) {
    password = await bcrypt.hash(password, 10)
    return this.userModel.create({ password, ...rest })
  }

  async authenticate ({ uid, password }: LoginInput) {
    const user = await this.userModel.findOne({ uid })
    if (!user) {
      throw new BadRequestException()
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException()
    }
    return user.id
  }
}
