import { Module } from '@nestjs/common'
import { FileService } from './files.service'
import { FilesResolver } from './files.resolver'

@Module({
  providers: [FilesResolver, FileService],
  exports: [FileService]
})
export class FilesModule {}
