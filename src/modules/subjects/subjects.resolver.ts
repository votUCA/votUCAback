import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { Subject } from './subjects.type'
import { SubjectsService } from './subjects.service'
import { SubjectInput } from './subjects.input'

@Resolver(() => Subject)
export class SubjectsResolver {
  constructor (private readonly subjectsService: SubjectsService) {}

  @Query(() => Subject)
  async subject (@Args() id: string) {
    return this.subjectsService.findById(id)
  }

  @Query(() => [Subject])
  async subjects () {
    return this.subjectsService.findAll()
  }

  @Mutation(() => Subject)
  async createSubject (@Args('input') input: SubjectInput) {
    return this.subjectsService.create(input)
  }
}
