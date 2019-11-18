import { forwardRef, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from '../auth/auth.module'
import { User } from './users.type'
import { UnprotectedUsersResolver, UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { LdapService } from '../ldap/ldap.service'

@Module({
  imports: [TypegooseModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UsersService,
    LdapService,
    UsersResolver,
    UnprotectedUsersResolver
  ],
  exports: [UsersService]
})
export class UsersModule {}
