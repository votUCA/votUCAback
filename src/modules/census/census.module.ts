import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { Census } from './census.type'
import { CensusService } from './census.service'
import { CensusResolver } from './census.resolver'

@Module({
  imports: [TypegooseModule.forFeature([Census])],
  providers: [CensusResolver, CensusService],
  exports: [CensusService],
})
export class CensusModule {}
