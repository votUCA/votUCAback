import { Module } from '@nestjs/common'
import { CensusesService } from './censuses.service'
import { CensusesResolver } from './censuses.resolver'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  providers: [CensusesService, CensusesResolver],
  exports: [CensusesService]
})
export class CensusesModule {}
