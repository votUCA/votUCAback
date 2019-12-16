import { forwardRef, Module } from '@nestjs/common'
import { AnswerResolver } from './answers.resolver'
import { AnswersService } from './answers.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { Answer } from './answers.type'
import { ElectoralProcessVotesModule } from '../electoral-process-votes/electoral-process-votes.module'

@Module({
  imports: [
    TypegooseModule.forFeature([Answer]),
    forwardRef(() => ElectoralProcessVotesModule)],
  providers: [AnswerResolver, AnswersService],
  exports: [AnswersService]
})
export class AnswersModule {}
