import { Module } from '@nestjs/common'
import { PollsResolver } from './polls.resolver'
import { PollsService } from './polls.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { Poll } from './polls.type'

@Module({
  imports: [TypegooseModule.forFeature([Poll])],
  providers: [PollsResolver, PollsService],
  exports: [PollsService]
})
export class PollsModule {}
