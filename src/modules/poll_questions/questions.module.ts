import { Module } from '@nestjs/common'
import { QuestionResolver } from './questions.resolver'
import { QuestionService } from './questions.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { Question } from './questions.type'

@Module({
  imports: [TypegooseModule.forFeature([Question])],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
