import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AnswersResolver } from './answers.resolver'
import { AnswersService } from './answers.service'
import { Answer } from './answers.type'

@Module({
  imports: [TypegooseModule.forFeature([Answer])],
  providers: [AnswersResolver, AnswersService],
  exports: [AnswersService]
})
export class AnswersModule {}
