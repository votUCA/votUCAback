import { Inject, Injectable } from '@nestjs/common'
import { Client, SearchOptions } from 'ldapts'
import { ConfigService } from '../config/config.service'
import { LoginInput } from '../users/login.input'

export type LdapSearchOptions = SearchOptions & {
  group?: string
}
@Injectable()
export class LdapService {
  private readonly client: Client

  constructor (
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {
    this.client = new Client({
      url: this.configService.ldapHost
    })
  }

  async ldapAuth ({ uid, password }: LoginInput) {
    let isAuth: boolean
    try {
      await this.client.bind(
        `cn=${uid},ou=Usuarios,dc=votouca,dc=com`,
        password
      )
      isAuth = true
    } catch {
      isAuth = false
    }
    await this.client.unbind()
    return isAuth
  }
}
