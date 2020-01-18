export const usersQuery = `query users {
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
export const colegiateBodiesQuery = `query {
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
export const censusesQuery = `query censuses{
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
 }`
