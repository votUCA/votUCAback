import { Injectable, BadRequestException, forwardRef, Inject } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { AnswerInput } from './answers.input'
import { Answer } from './answers.type'
import { ElectoralProcessVotesService } from '../electoral-process-votes/electoral-process-votes.service'
import { User } from '../users/users.type'
import { ElectoralProcessVoteInput } from '../electoral-process-votes/electoral-process-votes.input'

@Injectable()
export class AnswersService extends CrudService<Answer, AnswerInput> {
  constructor (
    @InjectModel(Answer)
    private readonly AnswerModel: ReturnModelType<typeof Answer>,

    @Inject(forwardRef(() => ElectoralProcessVotesService))
    private readonly electoralProcessVoteService: ElectoralProcessVotesService
  ) {
    super(AnswerModel)
  }

  async createAnswer (data: AnswerInput, user: User) {
    if (data.idCandidate === undefined && data.idPosibleAnswer === undefined) { throw new BadRequestException('idCandidate or idPosibleAnswer must be set') }

    const canCreate = await this.electoralProcessVoteService.checkCreate(user, data.idElectoralProcess, data.idRectifiedAnswer)

    if (!canCreate) { throw new BadRequestException('Cant create vote') }

    const answer = await this.create(data)
    const vote = new ElectoralProcessVoteInput()

    vote.idAnswer = answer.id
    vote.idElectoralProcess = data.idElectoralProcess
    vote.idRectifiedAnswer = data.idRectifiedAnswer
    vote.user = user

    await this.electoralProcessVoteService.create(vote)

    return answer
  }
}
