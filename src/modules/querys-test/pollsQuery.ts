export const pollsQuery = /* GraphQL */ `
  query polls {
    polls {
      id
      start
      end
      description
      maxVotes
      question
      options {
        id
        text
      }
      isRealTime
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
      secretary {
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
      results {
        voters
        votesCast
        whiteVotes
        results {
          votes
          group
          location
          genre
          option {
            id
            text
          }
        }
      }
      delegates {
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
  }
`
