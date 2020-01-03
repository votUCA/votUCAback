import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { CandidatesService } from './candidates.service'
import { Candidate } from './candidates.type'

@Module({
  imports: [TypegooseModule.forFeature([Candidate])],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}
