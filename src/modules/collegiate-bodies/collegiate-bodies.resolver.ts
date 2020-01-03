import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ID, Int } from 'type-graphql'
import { CollegiateBodiesService } from './collegiate-bodies.service'
import { CollegiateBody } from './collegiate-bodies.type'
import { CollegiateBodyInput, CollegiateBodyUserAssignInput } from './collegiate-bodies.input'

@Resolver(() => CollegiateBody)
export class CollegiateBodiesResolver {
  constructor (private readonly collegiateBodiesService: CollegiateBodiesService) {}

  @Query(() => CollegiateBody)
  async collegiateBody (@Args({ type: () => ID, name: 'id' }) id: string) {
    return this.collegiateBodiesService.findById(id)
  }

  @Query(() => [CollegiateBody])
  async collegiateBodies (@Args({ type: () => Int, name: 'limit', defaultValue: 0 }) limit: number, @Args({ type: () => Int, name: 'skip', defaultValue: 0 }) skip: number) {
    return this.collegiateBodiesService.findAll({ }, { skip, limit })
  }

  @Query(() => [CollegiateBody])
  async userCollegiateBodies (@Args({ type: () => ID, name: 'userId' }) userId: string, @Args({ type: () => Boolean, name: 'excludeUser' }) excludeUser: boolean) {
    const collegiateBodies = await this.collegiateBodiesService.findAll({ collegiates: userId })

    if (excludeUser) {
      for (let i = 0; i < collegiateBodies.length; i++) {
        collegiateBodies[i].collegiates = collegiateBodies[i].collegiates.filter(element => element.toString() !== userId)
      }
    }

    return collegiateBodies
  }

  @Mutation(() => CollegiateBody)
  async assignUserToCollegiateBody (@Args({ type: () => CollegiateBodyUserAssignInput, name: 'input' }) input: CollegiateBodyUserAssignInput) {
    return this.collegiateBodiesService.assignUserToCollegiateBody(input)
  }

  @Mutation(() => CollegiateBody)
  async createCollegiateBody (@Args({ type: () => CollegiateBodyInput, name: 'input' }) input: CollegiateBodyInput) {
    return this.collegiateBodiesService.create(input)
  }
}
