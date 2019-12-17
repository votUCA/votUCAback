import { forwardRef, Module } from '@nestjs/common'
import { ElectionsResolver } from './elections.resolver'
import { ElectionsService } from './elections.service'
import { Election } from './elections.type'
import { TypegooseModule } from 'nestjs-typegoose'
import { CandidatesModule } from '../candidates/candidates.module'
import { AnswersModule } from '../answers/answers.module'

@Module({
  imports: [TypegooseModule.forFeature([Election]), CandidatesModule, forwardRef(() => AnswersModule)],
  providers: [ElectionsResolver, ElectionsService],
  exports: [ElectionsService]
})
export class ElectionsModule {}
