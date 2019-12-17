import { forwardRef, Module } from '@nestjs/common'
import { ElectoralProcessVotesService } from './electoral-process-votes.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { ElectoralProcessVote } from './electoral-process-votes.type'
import { UsersModule } from '../users/users.module'
import { PollsModule } from '../polls/polls.module'
import { ElectionsModule } from '../elections/elections.module'
import { AnswersModule } from '../answers/answers.module'

@Module({
  imports: [
    TypegooseModule.forFeature([ElectoralProcessVote]),
    forwardRef(() => PollsModule),
    forwardRef(() => ElectionsModule),
    UsersModule,
    forwardRef(() => AnswersModule)
  ],
  providers: [ElectoralProcessVotesService],
  exports: [ElectoralProcessVotesService]
})
export class ElectoralProcessVotesModule {}
