import { Injectable } from '@nestjs/common'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
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
}
