import { createUnionType } from 'type-graphql'
import { Election } from './election.type'
import { Poll } from './poll.type'

export const ElectoralProcess = createUnionType({
  name: 'ElectoralProcess', // the name of the GraphQL union
  types: () => [Election, Poll], // function that returns array of object types classes
  resolveType: value => {
    if ('candidates' in value) {
      return Election
    }
    return Poll
  }
})
