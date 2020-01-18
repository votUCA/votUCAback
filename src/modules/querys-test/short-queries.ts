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
