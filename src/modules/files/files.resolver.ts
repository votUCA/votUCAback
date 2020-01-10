import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { FileService } from './files.service'
import { GqlAuthGuard } from '../auth/gql.guard'
import { File } from './files.type'

@Resolver()
@UseGuards(GqlAuthGuard)
export class FilesResolver {
  constructor(private readonly filesService: FileService) {}

  @Mutation(() => File)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<File> {
    return this.filesService.save(file)
  }
}
