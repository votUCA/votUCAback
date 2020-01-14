import { Module, forwardRef } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ColegiateBody } from './colegiate-bodies.type'
import { ColegiateBodyService } from './colegiate-bodies.service'
import { ColegiateBodyResolver } from './colegiate-bodies.resolver'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    TypegooseModule.forFeature([ColegiateBody]),
    forwardRef(() => UsersModule),
  ],
  providers: [ColegiateBodyResolver, ColegiateBodyService],
  exports: [ColegiateBodyService],
})
export class ColegiateBodiesModule {}
