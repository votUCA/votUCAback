import { Module } from '@nestjs/common'
import { ElectoralProcessResolver } from './electoral-process.resolver'
import { TypegooseModule } from 'nestjs-typegoose'
import { Election } from './election.type'
import { ElectionResolver } from './election.resolver'
import { ElectionsService } from './election.service'
import { CandidatesModule } from '../candidates/candidates.module'
import { ElectionResults, PollResults } from './electoral-process.results.type'
import { ElectionResultsService } from './election.results.service'
import {
  ElectionResultsResolver,
  PollResultsResolver
} from './electoral-process.results.resolver'
import { FilesModule } from '../files/files.module'
import { CensusModule } from '../census/census.module'
import { PollResolver } from './poll.resolver'
import { PollsService } from './poll.service'
import { Poll } from './poll.type'
import { PollResultsService } from './poll.results.service'

@Module({
  imports: [
    TypegooseModule.forFeature([Election, ElectionResults, Poll, PollResults]),
    CandidatesModule,
    FilesModule,
    CensusModule
  ],
  providers: [
    ElectoralProcessResolver,
    ElectionResolver,
    ElectionResultsResolver,
    ElectionsService,
    ElectionResultsService,
    PollResolver,
    PollsService,
    PollResultsResolver,
    PollResultsService
  ],
  exports: [ElectionsService, ElectionResultsService]
})
export class ElectoralProcessModule {}
