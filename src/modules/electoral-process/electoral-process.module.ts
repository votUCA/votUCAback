import { Module } from '@nestjs/common'
import { ElectoralProcessResolver } from './electoral-process.resolver'
import { TypegooseModule } from 'nestjs-typegoose'
import { Election } from './election.type'
import { ElectionResolver } from './election.resolver'
import { ElectionsService } from './election.service'
import { CandidatesModule } from '../candidates/candidates.module'
import { ElectionResults } from './electoral-process.results.type'
import { ElectionResultsService } from './election.results.service'
import { ElectionResultsResolver } from './electoral-process.results.resolver'
import { FilesModule } from '../files/files.module'
import { CensusModule } from '../census/census.module'

@Module({
  imports: [
    TypegooseModule.forFeature([Election, ElectionResults]),
    CandidatesModule,
    FilesModule,
    CensusModule
  ],
  providers: [
    ElectoralProcessResolver,
    ElectionResolver,
    ElectionResultsResolver,
    ElectionsService,
    ElectionResultsService
  ],
  exports: [ElectionsService, ElectionResultsService]
})
export class ElectoralProcessModule {}
