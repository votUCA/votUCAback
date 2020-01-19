import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as Joi from '@hapi/joi'

type EnvConfig = {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  DB_PORT: number
  DB_HOST: string
  DB_NAME: string
  JWT_SECRET: string
  FILES_PATH: string
}

type Env = Record<string, string>

@Injectable()
export class ConfigService {
  private readonly envConfig: Env & EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = ConfigService.validateInput(config)
  }

  private static validateInput(envConfig: Env): Env & EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      PORT: Joi.number().default(4000),
      DB_PORT: Joi.number().default(27017),
      DB_NAME: Joi.string().required(),
      DB_HOST: Joi.string()
        .required()
        .default('localhost'),
      JWT_SECRET: Joi.string().required(),
      FILES_PATH: Joi.string().required(),
    })
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig
    )
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  get(key: string): string {
    return this.envConfig[key]
  }

  get mongodbUri(): string {
    return `mongodb://${this.envConfig.DB_HOST}:${this.envConfig.DB_PORT}/${this.envConfig.DB_NAME}`
  }

  get debug(): boolean {
    return this.envConfig.NODE_ENV === 'development'
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET
  }

  get filesPath(): string {
    return this.envConfig.FILES_PATH
  }
}
