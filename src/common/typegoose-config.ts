import { Inject } from '@nestjs/common'
import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from 'nestjs-typegoose'
import { mongoose } from '@typegoose/typegoose'
import { ConfigService } from '../modules/config/config.service'

export class TypegooseConfigService implements TypegooseOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  createTypegooseOptions():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    mongoose.set('useFindAndModify', false)
    return {
      uri: this.configService.mongodbUri,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  }
}
