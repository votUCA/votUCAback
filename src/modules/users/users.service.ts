import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose/lib/types'
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { LoginInput } from './login.input'
import { UserInput } from './users.input'
import { User } from './users.model'

@Injectable()
export class UsersService extends CrudService<User, UserInput> {
  constructor (
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel)
  }

  async login ({ user, password }: LoginInput) {
    const foundUser = await this.userModel.findOne({ user })
    if (!foundUser) {
      throw new NotFoundException()
    }
    const valid = await bcrypt.compare(password, foundUser.password)
    if (!valid) {
      throw new UnauthorizedException()
    }
    return foundUser.id
  }

  async create (input: UserInput) {
    const { password, ...args } = input
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userModel.create({
      password: hashedPassword,
      ...args
    })
    return user
  }
}
