/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common'
import * as csvParse from 'csv-parse'
import * as fs from 'fs'
import { FileUpload } from 'graphql-upload'
import { join } from 'path'
import * as uuid from 'uuid/v4'
import { ConfigService } from '../config/config.service'
import { File } from './files.type'
import { CensusInput } from '../census/census.input'

@Injectable()
export class FileService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async save({ createReadStream, filename }: FileUpload): Promise<File> {
    const name = `${uuid()}-${filename}`
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(fs.createWriteStream(join(this.configService.filesPath, name)))
        .on('finish', () => resolve({ name }))
        .on('error', () => reject(new InternalServerErrorException()))
    )
  }

  async createJSON(censusInput: CensusInput){
    const data = JSON.stringify(censusInput, null, 2)
    const name = `${uuid()}.json`
    return new Promise((resolve, reject) => {
      fs.writeFile(join(this.configService.filesPath, name), data, err => {
        if(err){
          reject(err)
        }
        resolve(name)
      })
    })
  }

  onModuleInit(): void {
    if (!fs.existsSync(this.configService.filesPath)) {
      fs.mkdirSync(this.configService.filesPath)
    }
  }
}
