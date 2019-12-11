import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ElectionsService } from './elections.service'
import { Election } from './elections.type'
import { ElectionInput } from './elections.input'
import { CandidatesService } from '../candidates/candidates.service'
import { AnswersService } from '../answers/answers.service'
import { ElectionResult } from './results.type'

@Resolver(() => Election)
@UseGuards(GqlAuthGuard)
export class ElectionsResolver {
  constructor (private electionsService: ElectionsService,
              private candidatesService: CandidatesService,
              private answersService: AnswersService) {}

  @Query(() => [Election])
  async elections () {
    return this.electionsService.findAll()
  }

  @Query(() => Election)
  async election (@Args({ name: 'id', type: () => ID }) id: string) {
    return this.electionsService.findById(id)
  }

  @Mutation(() => Election)
  async createElection (@Args('input') input: ElectionInput) {
    return this.electionsService.create(input)
  }

  @Query(() => [ElectionResult])
  async showResults (@Args({ name: 'id', type: () => ID }) id: string) {
    const allCand = await this.candidatesService.findAll({ idElection: id })
    const result = allCand.reduce((prev, current) => ({ ...prev, [current.id]: 0 }), {})
    const answers = await this.answersService.findAll({ idCandidate: { $in: Object.keys(result) } })
    answers.forEach(answer => result[answer.idCandidate]++)
    return Object.entries(result).map(([id, votos]) => ({ candidate: allCand.find((candidate) => candidate.id === id), votos }))
  }
}
