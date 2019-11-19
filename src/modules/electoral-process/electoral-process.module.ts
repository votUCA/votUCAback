import { Module } from '@nestjs/common'
import { ElectoralProcessResolver } from './electoral-process.resolver'
import { ElectoralProcessService } from './electoral-process.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { ElectoralProcess } from './electoral-process.type'

@Module({
  imports: [TypegooseModule.forFeature([ElectoralProcess])],
  providers: [ElectoralProcessResolver, ElectoralProcessService],
  exports: [ElectoralProcessService]
})
export class ElectoralProcessModule {}
