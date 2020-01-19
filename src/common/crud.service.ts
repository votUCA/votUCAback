import {
  DocumentType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose/lib/types'

export class CrudService<M, I> {
  constructor(private readonly model: ReturnModelType<new () => M>) {}

  async findAll(
    conditions: any = {},
    options: any | null = null,
    projection: any | null = null
  ): Promise<M[]> {
    return this.model.find(conditions, projection, options)
  }

  async findById(ref: Ref<M> | string): Promise<DocumentType<M>> {
    return this.model.findById(ref)
  }

  async findOne(conditions: any): Promise<DocumentType<M>> {
    return this.model.findOne(conditions)
  }

  async create(data: I | I[]): Promise<DocumentType<M>> {
    return this.model.create(data)
  }

  async delete(ref: Ref<M> | string): Promise<DocumentType<M>> {
    return this.model.findByIdAndDelete(ref)
  }

  async update(ref: Ref<M> | string, data: any): Promise<DocumentType<M>> {
    return this.model.findByIdAndUpdate(ref, data, { new: true })
  }
}
