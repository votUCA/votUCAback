import { Injectable } from '@nestjs/common'
import {
  ReturnModelType,
  mongoose,
  DocumentType,
  Ref,
} from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CrudService } from '../../common/crud.service'
import { Census, Voter } from './census.type'
import { CensusInput } from './census.input'
import { DeleteMany } from '../../common/delete-many'

@Injectable()
export class CensusService extends CrudService<Census, CensusInput> {
  constructor(
    @InjectModel(Census)
    private readonly censusModel: ReturnModelType<typeof Census>
  ) {
    super(censusModel)
  }

  async create(data: any): Promise<DocumentType<Census>> {
    return this.censusModel.create(data)
  }

  async findOneAndUpdate(
    conditions: any,
    update: any
  ): Promise<DocumentType<Census>> {
    return this.censusModel.findOneAndUpdate(conditions, update)
  }

  async findVoter(
    $match: any
  ): Promise<Voter & { census: mongoose.Types.ObjectId }> {
    const [voter] = await this.censusModel.aggregate([
      {
        $match,
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { census: '$_id' },
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$voters',
                      as: 'voter',
                      cond: { $eq: ['$$voter.uid', $match['voters.uid']] },
                    },
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
    ])
    return voter
  }

  async deleteAllIn(list: Ref<Census>[]): Promise<DeleteMany> {
    return this.censusModel.deleteMany({ _id: { $in: list } })
  }
}
