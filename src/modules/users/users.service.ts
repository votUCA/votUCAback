import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import * as bcrypt from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { JwtPayload } from 'modules/auth/jwt.payload'
import { CrudService } from '../../common/crud.service'
import { LoginInput } from './login.input'
import { UserInput } from './users.input'
import { User } from './users.type'

@Injectable()
export class UsersService extends CrudService<User, UserInput> {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel)
  }

  async findByUid(uid: string): Promise<User> {
    return this.userModel.findOne({ uid })
  }

  async create({ password, ...rest }: UserInput): Promise<DocumentType<User>> {
    const encrypted = await bcrypt.hash(password, 10)
    return this.userModel.create({ password: encrypted, ...rest })
  }

  async authenticate({ uid, password }: LoginInput): Promise<JwtPayload> {
    const user = await this.userModel.findOne({ uid })
    if (!user) {
      throw new BadRequestException()
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException()
    }
    return { id: user.id, roles: user.roles }
  }
}
