import {
  TypegooseOptionsFactory,
  TypegooseModuleOptions,
} from 'nestjs-typegoose'
import { mongoose } from '@typegoose/typegoose'

export class TypegooseConfigService implements TypegooseOptionsFactory {
  createTypegooseOptions():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    mongoose.set('useFindAndModify', false)
    return {
      uri: global.__MONGO_URI__,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  }
}
