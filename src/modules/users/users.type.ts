import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { required } from '../../common/constants'
import { Role } from './roles.enum'
import { ColegiateBody } from '../colegiate-bodies/colegiate-bodies.type'

export enum Genre {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
registerEnumType(Genre, { name: 'Genre' })

@ObjectType()
export class User {
  @Field(() => ID)
  get id(this: any): string {
    return this._id || this._doc._id
  }

  @Field()
  @prop({ required })
  uid: string

  @Field()
  @prop({ required })
  dni: string

  @prop({ required })
  password: string

  @Field()
  @prop({ required })
  firstName: string

  @Field()
  @prop({ required })
  lastName: string

  @arrayProp({ enum: Object.keys(Role), default: [], type: String })
  @Field(() => Role)
  roles?: [Role]

  @Field(() => Genre)
  @prop({ required, enum: Object.keys(Genre), type: String })
  genre: Genre

  @prop({ ref: ColegiateBody })
  colegiateBody: Ref<ColegiateBody>
}
