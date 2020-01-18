import { ObjectId } from 'mongodb'

const elections = [
  {
    _id: new ObjectId('5e1e0158f9344483bc3ac557'),
    censuses: [
      new ObjectId('5e1e0158f9344483bc3ac552'),
      new ObjectId('5e1e0158f9344483bc3ac556'),
      new ObjectId('5e1e0158f9344483bc3ac554'),
      new ObjectId('5e1e0158f9344483bc3ac555'),
      new ObjectId('5e1e0158f9344483bc3ac553'),
    ],
    delegates: [],
    whiteVotes: 3,
    start: new Date('1578851928556'),
    end: new Date('1578956400000'),
    description: 'Rectorado UCA',
    maxVotes: 1,
    voteWeights: [
      {
        _id: new ObjectId('5e1e0158f9344483bc3ac55c'),
        group: 'PDVP',
        weight: 25,
      },
      {
        _id: new ObjectId('5e1e0158f9344483bc3ac55b'),
        group: 'PNDVP',
        weight: 55,
      },
      {
        _id: new ObjectId('5e1e0158f9344483bc3ac55a'),
        group: 'PDINVP',
        weight: 10,
      },
      {
        _id: new ObjectId('5e1e0158f9344483bc3ac559'),
        group: 'PAS',
        weight: 6,
      },
      {
        _id: new ObjectId('5e1e0158f9344483bc3ac558'),
        group: 'ALU',
        weight: 4,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e015cf9344483bc3ac5a2'),
    censuses: [
      new ObjectId('5e1e015cf9344483bc3ac59e'),
      new ObjectId('5e1e015cf9344483bc3ac59d'),
      new ObjectId('5e1e015cf9344483bc3ac5a0'),
      new ObjectId('5e1e015cf9344483bc3ac59f'),
      new ObjectId('5e1e015cf9344483bc3ac5a1'),
      new ObjectId('5e1e0158f9344483bc3ac552'),
      new ObjectId('5e1e0158f9344483bc3ac556'),
      new ObjectId('5e1e0158f9344483bc3ac554'),
      new ObjectId('5e1e0158f9344483bc3ac555'),
      new ObjectId('5e1e0158f9344483bc3ac553'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024732357'),
    end: new Date('1579474800000'),
    description: 'Delegados/as Ingeniería Informática',
    maxVotes: 2,
    voteWeights: [
      {
        _id: new ObjectId('5e1e015cf9344483bc3ac5a7'),
        group: 'PDVP',
        weight: 64,
      },
      {
        _id: new ObjectId('5e1e015cf9344483bc3ac5a6'),
        group: 'PNDVP',
        weight: 29,
      },
      {
        _id: new ObjectId('5e1e015cf9344483bc3ac5a5'),
        group: 'PDINVP',
        weight: 3,
      },
      {
        _id: new ObjectId('5e1e015cf9344483bc3ac5a4'),
        group: 'PAS',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e015cf9344483bc3ac5a3'),
        group: 'ALU',
        weight: 3,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e015df9344483bc3ac5bd'),
    censuses: [
      new ObjectId('5e1e015df9344483bc3ac5b8'),
      new ObjectId('5e1e015df9344483bc3ac5ba'),
      new ObjectId('5e1e015df9344483bc3ac5b9'),
      new ObjectId('5e1e015df9344483bc3ac5bc'),
      new ObjectId('5e1e015df9344483bc3ac5bb'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024733470'),
    end: new Date('1579474800000'),
    description:
      'Temporibus eligendi dolorem vel inventore molestiae non reprehenderit. Nostrum iusto distinctio velit recusandae. Et assumenda deserunt quas possimus. Voluptas officiis a quia sed ut porro adipisci.',
    maxVotes: 4,
    voteWeights: [
      {
        _id: new ObjectId('5e1e015df9344483bc3ac5c2'),
        group: 'PDVP',
        weight: 81,
      },
      {
        _id: new ObjectId('5e1e015df9344483bc3ac5c1'),
        group: 'PNDVP',
        weight: 16,
      },
      {
        _id: new ObjectId('5e1e015df9344483bc3ac5c0'),
        group: 'PDINVP',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e015df9344483bc3ac5bf'),
        group: 'PAS',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e015df9344483bc3ac5be'),
        group: 'ALU',
        weight: 1,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e015ff9344483bc3ac5e8'),
    censuses: [
      new ObjectId('5e1e015ff9344483bc3ac5e3'),
      new ObjectId('5e1e015ff9344483bc3ac5e5'),
      new ObjectId('5e1e015ff9344483bc3ac5e6'),
      new ObjectId('5e1e015ff9344483bc3ac5e7'),
      new ObjectId('5e1e015ff9344483bc3ac5e4'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024735593'),
    end: new Date('1579474800000'),
    description:
      'Earum eum officiis. Qui modi quia consequatur ut neque odit facere et.',
    maxVotes: 3,
    voteWeights: [
      {
        _id: new ObjectId('5e1e015ff9344483bc3ac5ed'),
        group: 'PDVP',
        weight: 89,
      },
      {
        _id: new ObjectId('5e1e015ff9344483bc3ac5ec'),
        group: 'PNDVP',
        weight: 7,
      },
      {
        _id: new ObjectId('5e1e015ff9344483bc3ac5eb'),
        group: 'PDINVP',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e015ff9344483bc3ac5ea'),
        group: 'PAS',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e015ff9344483bc3ac5e9'),
        group: 'ALU',
        weight: 2,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e0160f9344483bc3ac603'),
    censuses: [
      new ObjectId('5e1e0160f9344483bc3ac600'),
      new ObjectId('5e1e0160f9344483bc3ac5ff'),
      new ObjectId('5e1e0160f9344483bc3ac601'),
      new ObjectId('5e1e0160f9344483bc3ac5fe'),
      new ObjectId('5e1e0160f9344483bc3ac602'),
      new ObjectId('5e1e0158f9344483bc3ac552'),
      new ObjectId('5e1e0158f9344483bc3ac556'),
      new ObjectId('5e1e0158f9344483bc3ac554'),
      new ObjectId('5e1e0158f9344483bc3ac555'),
      new ObjectId('5e1e0158f9344483bc3ac553'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024736721'),
    end: new Date('1579474800000'),
    description: 'Decisión porcentajes',
    maxVotes: 3,
    voteWeights: [
      {
        _id: new ObjectId('5e1e0160f9344483bc3ac608'),
        group: 'PDVP',
        weight: 56,
      },
      {
        _id: new ObjectId('5e1e0160f9344483bc3ac607'),
        group: 'PNDVP',
        weight: 10,
      },
      {
        _id: new ObjectId('5e1e0160f9344483bc3ac606'),
        group: 'PDINVP',
        weight: 25,
      },
      {
        _id: new ObjectId('5e1e0160f9344483bc3ac605'),
        group: 'PAS',
        weight: 3,
      },
      {
        _id: new ObjectId('5e1e0160f9344483bc3ac604'),
        group: 'ALU',
        weight: 6,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e0163f9344483bc3ac63e'),
    censuses: [
      new ObjectId('5e1e0163f9344483bc3ac639'),
      new ObjectId('5e1e0163f9344483bc3ac63a'),
      new ObjectId('5e1e0163f9344483bc3ac63c'),
      new ObjectId('5e1e0163f9344483bc3ac63d'),
      new ObjectId('5e1e0163f9344483bc3ac63b'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024739593'),
    end: new Date('1579474800000'),
    description:
      'Veritatis et dignissimos suscipit. Dolores nihil molestiae porro consequatur non dolor deserunt ut sunt. Ut dolores accusantium aut et labore nihil asperiores neque.',
    maxVotes: 2,
    voteWeights: [
      {
        _id: new ObjectId('5e1e0163f9344483bc3ac643'),
        group: 'PDVP',
        weight: 81,
      },
      {
        _id: new ObjectId('5e1e0163f9344483bc3ac642'),
        group: 'PNDVP',
        weight: 4,
      },
      {
        _id: new ObjectId('5e1e0163f9344483bc3ac641'),
        group: 'PDINVP',
        weight: 12,
      },
      {
        _id: new ObjectId('5e1e0163f9344483bc3ac640'),
        group: 'PAS',
        weight: 2,
      },
      {
        _id: new ObjectId('5e1e0163f9344483bc3ac63f'),
        group: 'ALU',
        weight: 1,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e0168f9344483bc3ac699'),
    censuses: [
      new ObjectId('5e1e0168f9344483bc3ac694'),
      new ObjectId('5e1e0168f9344483bc3ac695'),
      new ObjectId('5e1e0168f9344483bc3ac696'),
      new ObjectId('5e1e0168f9344483bc3ac697'),
      new ObjectId('5e1e0168f9344483bc3ac698'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024744165'),
    end: new Date('1579474800000'),
    description:
      'Veniam quidem nesciunt sed dolores consequatur magni omnis rerum. Et at repellat itaque expedita error ab. Illum magnam voluptas velit neque nostrum. Harum doloribus autem rerum quidem.',
    maxVotes: 1,
    voteWeights: [
      {
        _id: new ObjectId('5e1e0168f9344483bc3ac69e'),
        group: 'PDVP',
        weight: 67,
      },
      {
        _id: new ObjectId('5e1e0168f9344483bc3ac69d'),
        group: 'PNDVP',
        weight: 8,
      },
      {
        _id: new ObjectId('5e1e0168f9344483bc3ac69c'),
        group: 'PDINVP',
        weight: 7,
      },
      {
        _id: new ObjectId('5e1e0168f9344483bc3ac69b'),
        group: 'PAS',
        weight: 8,
      },
      {
        _id: new ObjectId('5e1e0168f9344483bc3ac69a'),
        group: 'ALU',
        weight: 10,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e016af9344483bc3ac6c4'),
    censuses: [
      new ObjectId('5e1e016af9344483bc3ac6c2'),
      new ObjectId('5e1e016af9344483bc3ac6bf'),
      new ObjectId('5e1e016af9344483bc3ac6c1'),
      new ObjectId('5e1e016af9344483bc3ac6c0'),
      new ObjectId('5e1e016af9344483bc3ac6c3'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024746150'),
    end: new Date('1579474800000'),
    description:
      'Sint est sapiente enim. Officiis rerum itaque tenetur non. Vitae incidunt expedita voluptatem praesentium ad ut.',
    maxVotes: 2,
    voteWeights: [
      {
        _id: new ObjectId('5e1e016af9344483bc3ac6c9'),
        group: 'PDVP',
        weight: 25,
      },
      {
        _id: new ObjectId('5e1e016af9344483bc3ac6c8'),
        group: 'PNDVP',
        weight: 16,
      },
      {
        _id: new ObjectId('5e1e016af9344483bc3ac6c7'),
        group: 'PDINVP',
        weight: 42,
      },
      {
        _id: new ObjectId('5e1e016af9344483bc3ac6c6'),
        group: 'PAS',
        weight: 13,
      },
      {
        _id: new ObjectId('5e1e016af9344483bc3ac6c5'),
        group: 'ALU',
        weight: 4,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e016bf9344483bc3ac6df'),
    censuses: [
      new ObjectId('5e1e016bf9344483bc3ac6da'),
      new ObjectId('5e1e016bf9344483bc3ac6db'),
      new ObjectId('5e1e016bf9344483bc3ac6de'),
      new ObjectId('5e1e016bf9344483bc3ac6dc'),
      new ObjectId('5e1e016bf9344483bc3ac6dd'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024747308'),
    end: new Date('1579474800000'),
    description:
      'Ea nihil et pariatur tempore unde culpa odio. Minima repellat non corrupti vel nisi ea fugiat. Est molestiae iure quibusdam. Labore est mollitia qui quasi.',
    maxVotes: 2,
    voteWeights: [
      {
        _id: new ObjectId('5e1e016bf9344483bc3ac6e4'),
        group: 'PDVP',
        weight: 23,
      },
      {
        _id: new ObjectId('5e1e016bf9344483bc3ac6e3'),
        group: 'PNDVP',
        weight: 60,
      },
      {
        _id: new ObjectId('5e1e016bf9344483bc3ac6e2'),
        group: 'PDINVP',
        weight: 13,
      },
      {
        _id: new ObjectId('5e1e016bf9344483bc3ac6e1'),
        group: 'PAS',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e016bf9344483bc3ac6e0'),
        group: 'ALU',
        weight: 3,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
  {
    _id: new ObjectId('5e1e016ef9344483bc3ac71a'),
    censuses: [
      new ObjectId('5e1e016ef9344483bc3ac715'),
      new ObjectId('5e1e016ef9344483bc3ac718'),
      new ObjectId('5e1e016ef9344483bc3ac719'),
      new ObjectId('5e1e016ef9344483bc3ac717'),
      new ObjectId('5e1e016ef9344483bc3ac716'),
    ],
    delegates: [],
    whiteVotes: 0,
    start: new Date('1579024750148'),
    end: new Date('1579474800000'),
    description: 'Delegados/as Ingeniería Informática',
    maxVotes: 2,
    voteWeights: [
      {
        _id: new ObjectId('5e1e016ef9344483bc3ac71f'),
        group: 'PDVP',
        weight: 55,
      },
      {
        _id: new ObjectId('5e1e016ef9344483bc3ac71e'),
        group: 'PNDVP',
        weight: 14,
      },
      {
        _id: new ObjectId('5e1e016ef9344483bc3ac71d'),
        group: 'PDINVP',
        weight: 19,
      },
      {
        _id: new ObjectId('5e1e016ef9344483bc3ac71c'),
        group: 'PAS',
        weight: 1,
      },
      {
        _id: new ObjectId('5e1e016ef9344483bc3ac71b'),
        group: 'ALU',
        weight: 11,
      },
    ],
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
  },
]

export = elections
