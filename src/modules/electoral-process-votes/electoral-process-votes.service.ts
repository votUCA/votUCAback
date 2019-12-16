import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { ElectoralProcessVote } from './electoral-process-votes.type'
import { ElectionsService } from '../elections/elections.service'
import { PollsService } from '../polls/polls.service'
import { UsersService } from '../users/users.service'
import { AnswersService } from '../answers/answers.service'
import { ElectoralProcessVoteInput } from './electoral-process-votes.input'
import { User } from '../users/users.type'

@Injectable()
export class ElectoralProcessVotesService extends CrudService<ElectoralProcessVote, ElectoralProcessVoteInput> {
  constructor (
    @InjectModel(ElectoralProcessVote)
    private readonly ElectoralProcessVoteModule: ReturnModelType<typeof ElectoralProcessVote>,
    private readonly usersService: UsersService,
    private readonly pollsService: PollsService,

    @Inject(forwardRef(() => AnswersService))
    private readonly answersService: AnswersService,
    private readonly electionsService: ElectionsService
  ) {
    super(ElectoralProcessVoteModule)
  }

  async checkCreate (user: User, idElectoralProcess: string, idRectifiedAnswer: string) {
    let ret = true
    const userVotes = await this.findAll({ user: user, idElectoralProcess: idElectoralProcess })
    const poll = await this.pollsService.findById(idElectoralProcess)
    const election = await this.electionsService.findById(idElectoralProcess)
    const electoralProcess = poll || election
    const rectificative = idRectifiedAnswer !== null

    // Si no encuentra el proceso electoral, lanza excepción
    if (!electoralProcess) {
      throw new BadRequestException('Electoral process not found')
    }

    // Comprueba únicamente si hay algún voto del usuario registrado
    if (userVotes && userVotes.length) {
      if (poll || election) {
        // Si ya hay voto registrado
        if (!electoralProcess.correctVote) {
          ret = false
        } else {
          // Si es un nuevo voto, si es una votación, bloquear, en caso de ser eleccion comprobar que se puede votar
          if (!rectificative) {
            if (poll || (election && election.nVotes === userVotes.length)) {
              ret = false
            }
          } else {
            // Si es rectificativo, elimina los votos de esta respuesta del usuario
            userVotes.forEach((vote) => {
              if (vote.idAnswer === idRectifiedAnswer) {
                this.answersService.delete(vote.idAnswer)
                this.delete(vote)
              }
            })
          }
        }
      }
    }

    // Devuelve si puede registrar el voto
    return ret
  }
}
