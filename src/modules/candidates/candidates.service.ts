import { Injectable } from '@nestjs/common'
import { DocumentType, Ref, ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { DeleteMany } from '../../common/delete-many'
import { Election } from '../electoral-process/election.type'
import { CandidateInput } from './candidates.input'
import { Candidate } from './candidates.type'

@Injectable()
export class CandidatesService extends CrudService<Candidate, CandidateInput> {
  constructor(
    @InjectModel(Candidate)
    private readonly candidateModel: ReturnModelType<typeof Candidate>
  ) {
    super(candidateModel)
  }

  async create(data: any): Promise<DocumentType<Candidate>> {
    return this.candidateModel.create(data)
  }

  async deleteByIdAndElection(
    _id: string,
    election: string
  ): Promise<DocumentType<Candidate>> {
    return this.candidateModel.findOneAndDelete({ _id, election })
  }

  async deleteByElection(
    election: string | Ref<Election>
  ): Promise<DeleteMany> {
    return this.candidateModel.deleteMany({ election })
  }
}
