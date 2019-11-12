import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { UsersModule } from './users/users.module'
import { TypegooseConfigService } from '../common/typegoose-config'

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
        debug: configService.debug
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
