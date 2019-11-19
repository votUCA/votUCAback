import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Client, SearchOptions } from 'ldapts'
import { ConfigService } from '../config/config.service'
import { LoginInput } from '../users/login.input'
import { User } from '../users/users.type'

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

  async findAll ({
    group = '',
    ...options
  }: LdapSearchOptions): Promise<User[]> {
    const { searchEntries } = await this.client.search(
      this.configService.ldapBaseDn + group,
      options
    )
    return searchEntries.map(e => ({
      uid: e.uid as string,
      firstName: '',
      lastName: ''
    }))
  }

  async findByUid (uid: string): Promise<User> {
    const [user] = await this.findAll({ scope: 'sub', filter: `uid=${uid}` })
    if (user === undefined) {
      throw new NotFoundException()
    }
    return user
  }
}
