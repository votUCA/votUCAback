import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { QuestionInput } from './questions.input'
import { QuestionService } from './questions.service'
import { Question } from './questions.type'

@Resolver(() => Question)
@UseGuards(GqlAuthGuard)
export class QuestionResolver {
  constructor (private questionService: QuestionService) {}

  @Query(() => [Question])
  async questions () {
    return this.questionService.findAll()
  }

  @Query(() => Question)
  async question (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.questionService.findById(id)
  }

  @Mutation(() => Question)
  async createQuestion (@Args('input') input: QuestionInput) {
    return this.questionService.create(input)
  }
}
