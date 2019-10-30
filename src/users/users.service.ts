import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DocumentType, Ref, ReturnModelType } from '@typegoose/typegoose'
import { UserInput } from './users.input'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name)
    private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async findAll (
    conditions: any = {},
    options: any | null = null,
    projection: any | null = null
  ): Promise<DocumentType<User>[]> {
    return this.userModel.find(conditions, projection, options)
  }

  async findById (id: string | Ref<User>): Promise<DocumentType<User>> {
    return this.userModel.findById(id)
  }

  async create (data: UserInput): Promise<DocumentType<User>> {
    return this.userModel.create(data)
  }
}
