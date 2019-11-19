import { Module } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { SubjectsResolver } from './subjects.resolver'
import { TypegooseModule } from 'nestjs-typegoose'
import { Subject } from './subjects.type'

@Module({
  imports: [TypegooseModule.forFeature([Subject])],
  providers: [SubjectsService, SubjectsResolver],
  exports: [SubjectsService]
})
export class SubjectsModule {}
