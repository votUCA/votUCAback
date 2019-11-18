import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Client } from 'ldapts'
import { ConfigService } from '../config/config.service'
import { LoginInput } from '../users/login.input'

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

  async ldapAuth ({ user, password }: LoginInput) {
    let isAuth: boolean
    try {
      await this.client.bind(
        `cn=${user},ou=Usuarios,dc=votouca,dc=com`,
        password
      )
      isAuth = true
    } catch {
      isAuth = false
    } finally {
      await this.client.unbind()
      // eslint-disable-next-line no-unsafe-finally
      return isAuth
    }
  }

  async findByUid (uid: string) {
    try {
      const { searchEntries } = await this.client.search(
        this.configService.ldapBaseDn,
        {
          scope: 'sub',
          filter: `uid=${uid}`
        }
      )
      return searchEntries[0] || null
    } catch {
      throw new NotFoundException()
    } finally {
      await this.client.unbind()
    }
  }
}
