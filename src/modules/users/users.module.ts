import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { LdapService } from '../ldap/ldap.service'
import { RolesModule } from '../roles/roles.module'
import { UnprotectedUsersResolver, UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { User } from './users.type'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => RolesModule), TypegooseModule.forFeature([User])],
  providers: [UsersService, UsersResolver, UnprotectedUsersResolver, LdapService],
  exports: [UsersService]
})
export class UsersModule {}
