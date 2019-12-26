import { ObjectType } from 'type-graphql'
import { ElectoralProcess } from './electoral-process.abstract'

@ObjectType()
export class Election extends ElectoralProcess {}
