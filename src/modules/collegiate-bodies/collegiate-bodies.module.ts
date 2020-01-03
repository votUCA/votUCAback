import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { CollegiateBodiesService } from './collegiate-bodies.service'
import { CollegiateBody } from './collegiate-bodies.type'
import { CollegiateBodiesResolver } from './collegiate-bodies.resolver'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypegooseModule.forFeature([CollegiateBody]), UsersModule],
  providers: [CollegiateBodiesService, CollegiateBodiesResolver],
  exports: [CollegiateBodiesService]
})
export class CollegiateBodiesModule {}
