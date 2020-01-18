const inputElection = {
  description: 'Eleccion de Prueba',
  start: new Date().toISOString(),
  end: new Date('01/20/2020').toISOString(),
  delegates: [],
  candidates: [
    { firstName: 'Ñete', lastName: 'Ñete', about: 'Ñete' },
    { firstName: 'Ñete', lastName: 'Ñete', about: 'Ñete' },
  ],
  censuses: [
    {
      group: 'PAS',
      date: new Date().toISOString(),
      location: 'ESI',
      voters: [
        {
          firstName: 'Jose Fidel',
          lastName: 'Agudo',
          uid: 'u12345678',
          dni: '12345678u',
        },
        {
          firstName: 'Maite',
          lastName: 'Figueroa',
          uid: 'u12345638',
          dni: '12345638u',
        },
      ],
    },
    {
      group: 'ALU',
      date: new Date().toISOString(),
      location: 'ESI',
      voters: [
        {
          firstName: 'Jose Fidel',
          lastName: 'Agudo',
          uid: 'u12345678',
          dni: '12345678u',
        },
      ],
    },
  ],
  maxVotes: 1,
  voteWeights: [
    {
      weight: 3,
      group: 'ALU',
    },
    {
      weight: 4,
      group: 'PAS',
    },
  ],
}

export = inputElection
