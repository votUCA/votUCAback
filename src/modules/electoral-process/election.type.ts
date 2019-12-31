import { ObjectType, ArgsType, Field } from 'type-graphql'
import { ElectoralProcess } from './electoral-process.abstract'

@ObjectType()
export class Election extends ElectoralProcess {}

@ArgsType()
export class ElectionResultsArgs {
    @Field({ defaultValue: false })
    group: boolean

    @Field({ defaultValue: false })
    location: boolean
}
