const inputPoll = {
  description: 'Votación de Prueba',
  question: '¿Debo votar?',
  start: new Date().toISOString(),
  end: new Date('01/20/2020').toISOString(),
  delegates: [],
  options: ['Opcion1', 'Opcion2', 'Opcion3'],
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
  isRealTime: false,
}

const closedPoll = {
  description: 'Votación de Prueba2',
  question: '¿Debo votar?',
  start: new Date('01/16/2020').toISOString(),
  end: new Date('01/17/2020').toISOString(),
  delegates: [],
  options: ['Opcion1', 'Opcion2', 'Opcion3'],
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
  isRealTime: false,
}

export default { inputPoll, closedPoll }
