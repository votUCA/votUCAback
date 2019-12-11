import { Module } from '@nestjs/common'
import { CensusService } from './census.service'
import { CensusResolver } from './census.resolver'

@Module({
  providers: [CensusService, CensusResolver]
})
export class CensusModule {}
