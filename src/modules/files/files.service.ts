/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as csvParse from 'csv-parse'
import { createReadStream, createWriteStream } from 'fs'
import { FileUpload } from 'graphql-upload'
import { join } from 'path'
import * as uuid from 'uuid/v4'
import { ConfigService } from '../config/config.service'
import { File } from './files.type'

@Injectable()
export class FileService {
  constructor (private readonly configService: ConfigService) {}

  async save ({ createReadStream, filename }: FileUpload): Promise<File> {
    const name = `${uuid()}-${filename}`
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(join(this.configService.filesPath, name)))
        .on('finish', () => resolve({ name }))
        .on('error', () => reject(new InternalServerErrorException()))
    )
  }

  async readCSV (filename: string): Promise<{ [key: string]: string }[]> {
    return new Promise((resolve, reject) =>
      createReadStream(join(this.configService.filesPath, filename)).pipe(
        csvParse(
          {
            skip_empty_lines: true,
            skip_lines_with_empty_values: true,
            skip_lines_with_error: true
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
}
