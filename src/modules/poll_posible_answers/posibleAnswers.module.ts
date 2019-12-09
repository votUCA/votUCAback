import { Module } from '@nestjs/common'
import { PosibleAnswerResolver } from './posibleAnswers.resolver'
import { PosibleAnswerService } from './posibleAnswers.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { PosibleAnswer } from './posibleAnswers.type'

@Module({
  imports: [TypegooseModule.forFeature([PosibleAnswer])],
  providers: [PosibleAnswerResolver, PosibleAnswerService],
  exports: [PosibleAnswerService]
})
export class PosibleAnswerModule {}
