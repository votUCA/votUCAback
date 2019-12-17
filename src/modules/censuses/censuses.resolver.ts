import { Resolver, Query, Args, Parent } from '@nestjs/graphql'
import { Census } from './censuses.type'
import { CensusesService } from './censuses.service'
import { ID, FieldResolver } from 'type-graphql'
import { User } from '../users/users.type'
import { UsersService } from '../users/users.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { ElectionsService } from '../elections/elections.service'
import { ElectoralProcessVotesService } from '../electoral-process-votes/electoral-process-votes.service'

@Resolver(() => Census)
export class CensusesResolver {
  constructor (
    private readonly censusesService: CensusesService,
    private readonly usersService: UsersService,
    private readonly electionsService: ElectionsService,
    private readonly electoralProcessVotesService: ElectoralProcessVotesService
  ) {}

  @Query(() => [Census])
  async censuses () {
    return this.censusesService.findAll()
  }

  @Query(() => Census)
  async census (@Args({ type: () => ID, name: 'id' }) id: string) {
    return this.censusesService.findById(id)
  }

  @Query(() => [Census])
  async remainingElectoralProcesses (@CurrentUser() user: User) {
    const actualDate = new Date()
    // Obtenemos todos los censos donde esté el usuario
    const usercensus = await this.censusesService.findAll({ 'voters.uid': user.uid })
    let electsids: string[]

    for (const i in usercensus) {
      electsids.push(usercensus[i].idElectoralProcess)
    }
    // Obtenemos todas las elecciones activas y el usuario esté censado
    const userElections = await this.electionsService.findAll({ endTime: { $gte: actualDate }, _id: { $in: electsids } })
    // Creamos un objeto de tipo clave,valor, con valor cero
    const result = userElections.reduce((prev, current) => ({ ...prev, [current.id]: 0 }), {})
    // Contamos el voto por cada elección
    const answers = await this.electoralProcessVotesService.findAll({ idElectoralProcess: { $in: Object.keys(result) } })
    answers.forEach(answer => result[answer.idElectoralProcess]++)
    return Object.entries(result).map(([id, voto]) => ({ election: userElections.find((election) => election.id === id), voto }))
  }

  @FieldResolver(() => [User])
  async voters (@Parent() census: Census) {
    return this.usersService.findAll({ _id: { $in: census.voters } })
  }
}
