import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ConfigService } from './modules/config/config.service'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const config: ConfigService = app.get(ConfigService)
  if (config.debug) {
    const voyager = await import('graphql-voyager/middleware')
    app.use(
      '/voyager',
      voyager.express({
        endpointUrl: '/graphql',
      })
    )
  }
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.get('PORT'), () => {
    console.log(`🚀 on http://127.0.0.1:${config.get('PORT')}/graphql`)
    console.log(`🛰 on http://127.0.0.1:${config.get('PORT')}/voyager`)
  })
}
bootstrap()
