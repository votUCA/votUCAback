import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
