import { forwardRef, Module } from '@nestjs/common'
import { CensusesService } from './censuses.service'
import { CensusesResolver } from './censuses.resolver'
import { UsersModule } from '../users/users.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { Census } from './censuses.type'
import { ElectionsModule } from '../elections/elections.module'
import { ElectoralProcessModule } from '../electoral-process/electoral-process.module'
import { ElectoralProcessVotesModule } from '../electoral-process-votes/electoral-process-votes.module'

@Module({

  imports: [UsersModule, TypegooseModule.forFeature([Census]),
    forwardRef(() => ElectionsModule),
    forwardRef(() => ElectoralProcessModule),
    ElectoralProcessVotesModule
  ],
  providers: [CensusesService, CensusesResolver],
  exports: [CensusesService]
})
export class CensusesModule {}
