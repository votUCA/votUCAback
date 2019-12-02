import { Module } from '@nestjs/common'
import { ElectionsResolver } from './elections.resolver'
import { ElectionsService } from './elections.service'
import { Election } from './elections.type'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [TypegooseModule.forFeature([Election])],
  providers: [ElectionsResolver, ElectionsService],
  exports: [ElectionsService]
})
export class ElectionsModule {}
