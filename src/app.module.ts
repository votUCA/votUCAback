import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/backend', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    UsersModule
  ]
})
export class AppModule {}
