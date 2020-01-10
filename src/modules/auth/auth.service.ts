import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt.payload'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser({ id, roles }: JwtPayload): Promise<any | null> {
    const user = await this.usersService.findById(id)
    if (id && user) {
      return { ...user.toObject(), rolesName: roles }
    }
    return null
  }

  async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload)
  }
}
