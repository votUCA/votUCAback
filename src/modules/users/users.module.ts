import { forwardRef, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from '../auth/auth.module'
import { User } from './users.model'
import { UnprotectedUsersResolver, UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [TypegooseModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UsersResolver, UnprotectedUsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
