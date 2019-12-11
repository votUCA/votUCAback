import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { AnswerInput } from './answers.input'
import { AnswerService } from './answers.service'
import { Answer } from './answers.type'

@Resolver(() => Answer)
@UseGuards(GqlAuthGuard)
export class AnswerResolver {
  constructor (private answerService: AnswerService) {}

  @Query(() => [Answer])
  async answers () {
    return this.answerService.findAll()
  }

  @Query(() => Answer)
  async answer (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.answerService.findById(id)
  }

  @Mutation(() => Answer)
  async createAnswer (@Args('input') input: AnswerInput) {
    return this.answerService.create(input)
  }
}
