import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common'
import { Client } from 'ldapts'
import { ConfigService } from '../config/config.service'

@Injectable()
export class LdapService {
    constructor (
        @Inject(ConfigService)
        private readonly configService: ConfigService
    ){}

    client = new Client({  
        url: this.configService.ldapHost
    })

    async ldap_auth(uid: string,password: string) {
        try {
            await this.client.bind('cn=' + uid +',ou=Usuarios,dc=votouca,dc=com', password)
        } catch {
            return false
        } finally {
            await this.client.unbind()
            return true
        }
    }
}