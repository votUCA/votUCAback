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

  async readCSV(filename: string): Promise<{ [key: string]: string }[]> {
    return new Promise((resolve, reject) =>
      fs.createReadStream(join(this.configService.filesPath, filename)).pipe(
        csvParse(
          {
            skip_empty_lines: true,
            skip_lines_with_empty_values: true,
            skip_lines_with_error: true,
            columns: true,
          },
          (err, data) => {
            if (err) {
              reject(err)
            }
            resolve(data)
          }
        )
      )
    )
  }

  onModuleInit(): void {
    if (!fs.existsSync(this.configService.filesPath)) {
      fs.mkdirSync(this.configService.filesPath)
    }
  }
}
