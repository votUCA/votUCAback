import { forwardRef, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from '../auth/auth.module'
import { UnprotectedUsersResolver, UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { User } from './users.type'
import { ColegiateBodiesModule } from '../colegiate-bodies/colegiate-bodies.module'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypegooseModule.forFeature([User]),
    ColegiateBodiesModule,
  ],
  providers: [UsersService, UsersResolver, UnprotectedUsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
