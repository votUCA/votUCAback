import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ColegiateBody } from './colegiate-bodies.type'
import { ColegiateBodyService } from './colegiate-bodies.service'
import { ColegiateBodyResolver } from './colegiate-bodies.resolver'

@Module({
  imports: [TypegooseModule.forFeature([ColegiateBody])],
  providers: [ColegiateBodyResolver, ColegiateBodyService],
  exports: [ColegiateBodyService],
})
export class ColegiateBodiesModule {}
