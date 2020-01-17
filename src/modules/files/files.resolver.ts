import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { FileService } from './files.service'
import { GqlAuthGuard } from '../auth/gql.guard'
import { File } from './files.type'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../users/roles.enum'
import { RolesGuard } from '../auth/roles.guard'

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class FilesResolver {
  constructor(private readonly filesService: FileService) {}

  @Roles(Role.ADMIN, Role.SECRETARY)
  @Mutation(() => File)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<File> {
    return this.filesService.save(file)
  }
}
