import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { RolesResolver } from './roles.resolver'
import { RolesService } from './roles.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { Role } from './roles.type'

@Module({
  imports: [forwardRef(() => UsersModule), TypegooseModule.forFeature([Role])],
  providers: [RolesService, RolesResolver],
  exports: [RolesService]
})
export class RolesModule {}
