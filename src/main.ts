import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ConfigService } from './modules/config/config.service'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const config: ConfigService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.get('PORT'))
}
bootstrap()
