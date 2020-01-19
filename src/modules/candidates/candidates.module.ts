import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'
import { CandidatesResolver } from './candidates.resolver'

@Module({
  imports: [TypegooseModule.forFeature([Candidate])],
  providers: [CandidatesService, CandidatesResolver],
  exports: [CandidatesService],
})
export class CandidatesModule {}
