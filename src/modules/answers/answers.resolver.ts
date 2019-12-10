import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { AnswerInput } from './answers.input'
import { AnswersService } from './answers.service'
import { Answer } from './answers.type'

@Resolver(() => Answer)
@UseGuards(GqlAuthGuard)
export class AnswersResolver {
  constructor (private answersService: AnswersService) {}

  @Query(() => [Answer])
  async answerss () {
    return this.answersService.findAll()
  }

  @Query(() => Answer)
  async answers (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.answersService.findById(id)
  }

  @Mutation(() => Answer)
  async createAnswers (@Args('input') input: AnswerInput) {
    return this.answersService.create(input)
  }
}
