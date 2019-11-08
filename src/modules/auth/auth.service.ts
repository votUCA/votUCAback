import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/users.model'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser (id: string): Promise<User | null> {
    const user = await this.usersService.findById(id)
    if (id && user) {
      return user
    }
    return null
  }

  async createToken (id: string): Promise<string> {
    return this.jwtService.sign({ id })
  }
}