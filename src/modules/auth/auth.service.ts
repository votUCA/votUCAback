import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LdapService } from '../ldap/ldap.service'
import { Entry } from 'ldapts/messages'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly ldapService: LdapService
  ) {}

  async validateUser (id: string): Promise<Entry | null> {
    const user = await this.ldapService.findByUid(id)
    if (id && user) {
      return user
    }
    return null
  }

  async createToken (id: string): Promise<string> {
    return this.jwtService.sign({ id })
  }
}
