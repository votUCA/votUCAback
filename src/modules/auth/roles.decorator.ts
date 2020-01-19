import { SetMetadata } from '@nestjs/common'
import { Role } from '../users/roles.enum'

export const Roles = (...roles: Role[]): any => SetMetadata('roles', roles)
