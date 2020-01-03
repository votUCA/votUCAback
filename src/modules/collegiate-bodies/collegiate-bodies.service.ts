import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { CollegiateBodyInput, CollegiateBodyUserAssignInput } from './collegiate-bodies.input'
import { CollegiateBody } from './collegiate-bodies.type'
import { UsersService } from '../users/users.service'

@Injectable()
export class CollegiateBodiesService extends CrudService<CollegiateBody, CollegiateBodyInput> {
  constructor (
    @InjectModel(CollegiateBody)
    private readonly collegiateBodyModel: ReturnModelType<typeof CollegiateBody>,
    private readonly usersService: UsersService
  ) {
    super(collegiateBodyModel)
  }

  async create (data: any) {
    return this.collegiateBodyModel.create(data)
  }

  async assignUserToCollegiateBody (input: CollegiateBodyUserAssignInput) {
    const collegiateBody = await this.findById(input.collegiateBodyId)

    // Comprueba que exista el organo colegiado a añadir
    if (!collegiateBody) {
      throw new BadRequestException('Collegiate body does not exist')
    }

    // Comprueba que exista el usuario
    const user = await this.usersService.findById(input.userId)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    // Comprueba que el usuario no esté ya asignado a este órgano colegiado
    const userCollegiate = collegiateBody.collegiates.find(element => {
      return element.toString() === input.userId
    })

    if (userCollegiate) { throw new BadRequestException('User is already assigned to this collegiate body') }

    // Borra todos los órganos colegiados del usuario
    const userCollegiateBodies = await this.findAll({ collegiates: input.userId })
    for (const element of userCollegiateBodies) {
      const collegiate = await this.findById(element.id)
      collegiate.collegiates = collegiate.collegiates.filter(elem => elem.toString() !== input.userId)
      await collegiate.save()
    }

    collegiateBody.collegiates.push(user)

    return collegiateBody.save()
  }
}
