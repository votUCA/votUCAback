import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { RoleInput } from './roles.input'
import { Role } from './roles.type'

@Injectable()
export class RolesService extends CrudService<Role, RoleInput> {
  constructor (
    @InjectModel(Role)
    private readonly roleModel: ReturnModelType<typeof Role>
  ) {
    super(roleModel)
  }
}
