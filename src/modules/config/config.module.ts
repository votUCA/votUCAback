import { Module, Global } from '@nestjs/common'
import { ConfigService } from './config.service'

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(process.env.CI ? '.env.ci' : '.env'),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
