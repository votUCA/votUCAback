import { Module } from '@nestjs/common'
import { CensusesService } from './censuses.service'
import { CensusesResolver } from './censuses.resolver'

@Module({
  providers: [CensusesService, CensusesResolver]
})
export class CensusesModule {}
