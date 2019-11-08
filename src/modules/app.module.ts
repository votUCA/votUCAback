import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { mongodbFactory } from './config/config.mongo'
import { ConfigService } from './config/config.service'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule,
    TypegooseModule.forRootAsync({
      useFactory: mongodbFactory,
      inject: [ConfigService]
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
