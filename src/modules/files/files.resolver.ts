import { FileService } from './files.service'

import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.guard'
import { File } from './files.type'

@Resolver()
@UseGuards(GqlAuthGuard)
export class FilesResolver {
  constructor (private readonly filesService: FileService) {}

  @Mutation(() => File)
  async uploadFile (
    @Args({ name: 'file', type: () => GraphQLUpload })
      file: FileUpload
  ) {
    return this.filesService.save(file)
  }
}
