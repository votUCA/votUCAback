import { Inject } from '@nestjs/common'
import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory
} from 'nestjs-typegoose'
import { ConfigService } from '../modules/config/config.service'

export class TypegooseConfigService implements TypegooseOptionsFactory {
  constructor (
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  createTypegooseOptions ():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    return {
      uri: this.configService.mongodbUri,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  }
}
