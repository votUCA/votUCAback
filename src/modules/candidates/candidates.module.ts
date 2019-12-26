import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { CandidatesResolver } from './candidates.resolver'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'

@Module({
  imports: [TypegooseModule.forFeature([Candidate])],
  providers: [CandidatesResolver, CandidatesService],
  exports: [CandidatesService]
})
export class CandidatesModule {}
