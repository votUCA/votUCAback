export const usersQuery = /* GraphQL */ `
  query users {
    users {
      id
      uid
      dni
      firstName
      lastName
      roles
      genre
      colegiateBody {
        id
        name
      }
    }
  }
`
export const colegiateBodiesQuery = /* GraphQL */ `
  query {
    colegiateBodies {
      id
      name
      users {
        id
        uid
        lastName
        lastName
      }
    }
  }
`
export const censusesQuery = /* GraphQL */ `
  query censuses {
    censuses {
      id
      group
      date
      location
      voters {
        firstName
        lastName
        uid
        dni
      }
    }
  }
`
export const pendingElectoralProcessesQuery = /* GraphQL */ `
  query pendingElectoralProcess {
    pendingElectoralProcesses {
      __typename
      ... on Election {
        id
        start
        end
        description
        candidates {
          id
        }
      }
      ... on Poll {
        id
        start
        end
        description
        options {
          id
        }
      }
    }
  }
`
export const voteElectionQuery = /* GraphQL */ `
  mutation voteElection($input: VoteElectionInput!) {
    voteOnElection(input: $input)
  }
`
export const votePollQuery = /* GraphQL */ `
  mutation votePoll($input: VotePollInput!) {
    voteOnPoll(input: $input)
  }
`
export const loginQuery = /* GraphQL */ `
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`
