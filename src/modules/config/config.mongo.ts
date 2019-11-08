import * as mongoose from 'mongoose'
import { ConfigService } from './config.service'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const mongodbFactory = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => {
  mongoose.set('debug', configService.debug)
  return {
    uri: configService.mongodbUri,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
}
