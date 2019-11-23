import { createUnionType } from 'type-graphql'
import { Election } from '../elections/elections.type'
import { Poll } from '../polls/polls.type'

export const ElectoralProcess = createUnionType({
  name: 'ElectoralProcess', // the name of the GraphQL union
  types: () => [Election, Poll], // function that returns array of object types classes
  resolveType: value => {
    if ('isSecret' in value) {
      return Poll
    }
    if ('candidate' in value) {
      return Election
    }
    return undefined
  }
})
