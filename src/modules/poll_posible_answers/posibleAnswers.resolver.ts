import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { PosibleAnswerInput } from './posibleAnswers.input'
import { PosibleAnswerService } from './posibleAnswers.service'
import { PosibleAnswer } from './posibleAnswers.type'

@Resolver(() => PosibleAnswer)
@UseGuards(GqlAuthGuard)
export class PosibleAnswerResolver {
  constructor (private posibleAnswerService: PosibleAnswerService) {}

  @Query(() => [PosibleAnswer])
  async posibleAnswers () {
    return this.posibleAnswerService.findAll()
  }

  @Query(() => PosibleAnswer)
  async posibleAnswer (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.posibleAnswerService.findById(id)
  }

  @Mutation(() => PosibleAnswer)
  async createPosibleAnswer (@Args('input') input: PosibleAnswerInput) {
    return this.posibleAnswerService.create(input)
  }
}
