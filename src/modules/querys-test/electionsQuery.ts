export const electionsQuery = `query elections
{
  elections {
    id
    start
    end
    description
    maxVotes
    voteWeights {
      group
      weight
    }
    candidates {
      id
      firstName
      lastName
      about
      image
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
        candidate {
          id
          firstName
          lastName
          about
          image
        }
      }
    }
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
  
}`
