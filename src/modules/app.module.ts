import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypegooseModule } from 'nestjs-typegoose'
import { _10_MB } from '../common/constants'
import { UploadScalar } from '../common/scalars/upload'
import { TypegooseConfigService } from '../common/typegoose-config'
import { AuthModule } from './auth/auth.module'
import { CandidatesModule } from './candidates/candidates.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { ElectoralProcessModule } from './electoral-process/electoral-process.module'
import { FilesModule } from './files/files.module'
import { UsersModule } from './users/users.module'
import { CensusModule } from './census/census.module'
import { CollegiateBodiesModule } from './collegiate-bodies/collegiate-bodies.module'

@Module({
  imports: [
    ConfigModule,
    TypegooseModule.forRootAsync({
      useClass: TypegooseConfigService
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: 'schema.gql',
        context: ({ req }) => ({ req }),
        debug: configService.debug,
        playground: configService.debug,
        uploads: {
          maxFileSize: _10_MB,
          maxFiles: 5
        }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    ElectoralProcessModule,
    CandidatesModule,
    CensusModule,
    CollegiateBodiesModule
  ],
  providers: [UploadScalar]
})
export class AppModule {}
