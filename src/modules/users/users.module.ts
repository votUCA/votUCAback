import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { LdapService } from '../ldap/ldap.service'
import { UnprotectedUsersResolver, UsersResolver } from './users.resolver'

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [LdapService, UsersResolver, UnprotectedUsersResolver],
  exports: [LdapService]
})
export class UsersModule {}
