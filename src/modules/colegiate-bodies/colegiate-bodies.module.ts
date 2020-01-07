import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ColegiateBody } from './colegiate-bodies.type'
import { ColegiateBodyService } from './colegiate-bodies.service'

@Module({
  imports: [TypegooseModule.forFeature([ColegiateBody])],
  providers: [ColegiateBodyService],
  exports: [ColegiateBodyService],
})
export class ColegiateBodiesModule {}
