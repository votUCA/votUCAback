import {
  TypegooseOptionsFactory,
  TypegooseModuleOptions,
} from 'nestjs-typegoose'

export class TypegooseConfigService implements TypegooseOptionsFactory {
  createTypegooseOptions():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    return {
      uri: global.__MONGO_URI__,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  }
}
