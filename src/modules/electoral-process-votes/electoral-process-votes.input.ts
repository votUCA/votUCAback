import { prop, Ref } from '@typegoose/typegoose'
import { User } from '../users/users.type'

export class ElectoralProcessVoteInput {
  get id (this: any) {
    return this._id || this._doc._id
  }

  @prop({ ref: 'User' })
  user?: Ref<User>

  @prop()
  idElectoralProcess: string

  @prop()
  idAnswer?: string

  @prop()
  idRectifiedAnswer?: string
}
