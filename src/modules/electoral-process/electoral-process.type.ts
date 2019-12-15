import { createUnionType } from 'type-graphql'
import { Election } from './election.type'

export const ElectoralProcess = createUnionType({
  name: 'ElectoralProcess', // the name of the GraphQL union
  types: () => [Election], // function that returns array of object types classes
  resolveType: () => {
    return Election
  }
})
