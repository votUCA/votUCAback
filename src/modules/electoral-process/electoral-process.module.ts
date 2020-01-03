import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ElectoralProcessResolver } from './electoral-process.resolver'
import { Election, ElectionVote } from './election.type'
import { ElectionResolver } from './election.resolver'
import { ElectionsService } from './election.service'
import { CandidatesModule } from '../candidates/candidates.module'
import { ElectionResults, PollResults } from './electoral-process.results.type'
import { ElectionResultsService } from './election.results.service'
import {
  ElectionResultsResolver,
  PollResultsResolver,
} from './electoral-process.results.resolver'
import { FilesModule } from '../files/files.module'
import { CensusModule } from '../census/census.module'
import { PollResolver } from './poll.resolver'
import { PollsService } from './poll.service'
import { Poll, PollVote } from './poll.type'
import { PollResultsService } from './poll.results.service'
import { PollVoteService } from './poll.votes.service'
import { ElectionVotesService } from './election.votes.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      Election,
      ElectionResults,
      ElectionVote,
      Poll,
      PollResults,
      PollVote,
    ]),
    CandidatesModule,
    FilesModule,
    CensusModule,
  ],
  providers: [
    ElectoralProcessResolver,
    ElectionResolver,
    ElectionResultsResolver,
    ElectionsService,
    ElectionResultsService,
    ElectionVotesService,
    PollResolver,
    PollsService,
    PollResultsResolver,
    PollResultsService,
    PollVoteService,
  ],
  exports: [ElectionsService, ElectionResultsService],
})
export class ElectoralProcessModule {}
