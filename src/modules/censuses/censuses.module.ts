import { Module } from '@nestjs/common'
import { CensusesService } from './censuses.service'
import { CensusesResolver } from './censuses.resolver'
import { UsersModule } from '../users/users.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { Census } from './censuses.type'

@Module({

  imports: [UsersModule, TypegooseModule.forFeature([Census])],
  providers: [CensusesService, CensusesResolver],
  exports: [CensusesService]
})
export class CensusesModule {}
