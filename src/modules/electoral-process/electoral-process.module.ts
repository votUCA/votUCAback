import { forwardRef, Module } from '@nestjs/common'
import { ElectionsModule } from '../elections/elections.module'
import { PollsModule } from '../polls/polls.module'
import { ElectoralProcessResolver } from './electoral-process.resolver'

@Module({
  imports: [forwardRef(() => PollsModule), forwardRef(() => ElectionsModule)],
  providers: [ElectoralProcessResolver]
})
export class ElectoralProcessModule {}
