import { ObjectId } from 'mongodb'

const polls = [
  {
    _id: new ObjectId('5e1e012cf9344483bc3ac21b'),
    censuses: [
      new ObjectId('5e1e012cf9344483bc3ac216'),
      new ObjectId('5e1e012cf9344483bc3ac217'),
      new ObjectId('5e1e012cf9344483bc3ac218'),
      new ObjectId('5e1e012cf9344483bc3ac21a'),
      new ObjectId('5e1e012cf9344483bc3ac219'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e012cf9344483bc3ac21e'),
        text:
          'Ratione et possimus deserunt quasi qui itaque pariatur adipisci sit.',
      },
      {
        _id: new ObjectId('5e1e012cf9344483bc3ac21d'),
        text:
          'Maiores perferendis voluptatem eaque praesentium qui doloribus est eius temporibus.',
      },
      {
        _id: new ObjectId('5e1e012cf9344483bc3ac21c'),
        text: 'Mollitia quis dolorum quia odio labore et fuga incidunt earum.',
      },
    ],
    start: new Date('1579024684444'),
    end: new Date('1579474800000'),
    description:
      'A est deleniti. Nisi officiis nesciunt harum omnis nihil et laudantium optio officiis. Sunt nisi rerum nobis hic et modi ullam in.',
    maxVotes: 1,
    question:
      'Omnis quasi labore quis voluptatem consequatur voluptatem dolore amet sit.',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e012ff9344483bc3ac251'),
    censuses: [
      new ObjectId('5e1e012ff9344483bc3ac24e'),
      new ObjectId('5e1e012ff9344483bc3ac24c'),
      new ObjectId('5e1e012ff9344483bc3ac24d'),
      new ObjectId('5e1e012ff9344483bc3ac24f'),
      new ObjectId('5e1e012ff9344483bc3ac250'),
      new ObjectId('5e1e0158f9344483bc3ac553'),
      new ObjectId('5e1e0158f9344483bc3ac556'),
      new ObjectId('5e1e0158f9344483bc3ac554'),
      new ObjectId('5e1e0158f9344483bc3ac555'),
      new ObjectId('5e1e0158f9344483bc3ac553'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e012ff9344483bc3ac253'),
        text:
          'Dolorem voluptas consequuntur incidunt recusandae consequatur omnis facere et maiores.',
      },
      {
        _id: new ObjectId('5e1e012ff9344483bc3ac252'),
        text:
          'Dolor accusamus sunt velit cum repudiandae perferendis dolores aut perspiciatis.',
      },
    ],
    start: new Date('1579024687389'),
    end: new Date('1579474800000'),
    description: 'Votación mejor manager',
    maxVotes: 1,
    question: '¿Quien ha sido el mejor manager?',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e0131f9344483bc3ac277'),
    censuses: [
      new ObjectId('5e1e0131f9344483bc3ac273'),
      new ObjectId('5e1e0131f9344483bc3ac272'),
      new ObjectId('5e1e0131f9344483bc3ac275'),
      new ObjectId('5e1e0131f9344483bc3ac276'),
      new ObjectId('5e1e0131f9344483bc3ac274'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0131f9344483bc3ac27c'),
        text:
          'Qui consequatur est ea in distinctio laboriosam fugit deleniti omnis.',
      },
      {
        _id: new ObjectId('5e1e0131f9344483bc3ac27b'),
        text:
          'Odit rerum aliquid non ex praesentium sapiente commodi voluptates voluptatem.',
      },
      {
        _id: new ObjectId('5e1e0131f9344483bc3ac27a'),
        text:
          'Id corrupti molestiae sapiente velit unde numquam sed nisi alias.',
      },
      {
        _id: new ObjectId('5e1e0131f9344483bc3ac279'),
        text: 'Magnam fuga atque non aut non reiciendis est voluptatem nisi.',
      },
      {
        _id: new ObjectId('5e1e0131f9344483bc3ac278'),
        text: 'Qui alias accusantium praesentium sint et ea id fugit delectus.',
      },
    ],
    start: new Date('1579024689354'),
    end: new Date('1579474800000'),
    description:
      'Sequi cum aut accusamus voluptatem suscipit possimus dolores. Molestias voluptatem est dicta.',
    maxVotes: 1,
    question: 'Rerum corrupti placeat aut quo ea labore fugiat neque neque.',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e0136f9344483bc3ac2cd'),
    censuses: [
      new ObjectId('5e1e0136f9344483bc3ac2c8'),
      new ObjectId('5e1e0136f9344483bc3ac2c9'),
      new ObjectId('5e1e0136f9344483bc3ac2cc'),
      new ObjectId('5e1e0136f9344483bc3ac2ca'),
      new ObjectId('5e1e0136f9344483bc3ac2cb'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0136f9344483bc3ac2d1'),
        text:
          'Tenetur culpa inventore sed saepe ullam vel id temporibus veritatis.',
      },
      {
        _id: new ObjectId('5e1e0136f9344483bc3ac2d0'),
        text:
          'Adipisci a at ut architecto expedita libero blanditiis nobis iusto.',
      },
      {
        _id: new ObjectId('5e1e0136f9344483bc3ac2cf'),
        text: 'At natus rerum iure molestiae autem et tenetur deserunt sed.',
      },
      {
        _id: new ObjectId('5e1e0136f9344483bc3ac2ce'),
        text:
          'Est veritatis et cum accusantium velit et quod dignissimos incidunt.',
      },
    ],
    start: new Date('1579024693971'),
    end: new Date('1579474800000'),
    description:
      'Quis doloremque ipsam qui. Explicabo cum eius consequatur. Deleniti animi nulla dignissimos at et hic et ipsa autem.',
    maxVotes: 1,
    question:
      'Esse provident doloremque vero laboriosam autem est fugiat impedit sint.',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e0139f9344483bc3ac313'),
    censuses: [
      new ObjectId('5e1e0139f9344483bc3ac30e'),
      new ObjectId('5e1e0139f9344483bc3ac311'),
      new ObjectId('5e1e0139f9344483bc3ac30f'),
      new ObjectId('5e1e0139f9344483bc3ac310'),
      new ObjectId('5e1e0139f9344483bc3ac312'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0139f9344483bc3ac316'),
        text: 'Et voluptas ut fugit qui ipsa inventore fugit qui magni.',
      },
      {
        _id: new ObjectId('5e1e0139f9344483bc3ac315'),
        text:
          'Cupiditate quos qui suscipit et ad consequatur rerum omnis numquam.',
      },
      {
        _id: new ObjectId('5e1e0139f9344483bc3ac314'),
        text:
          'Asperiores nesciunt cum doloremque earum adipisci ut ducimus harum corrupti.',
      },
    ],
    start: new Date('1579024697650'),
    end: new Date('1579474800000'),
    description:
      'Optio minus corporis laborum optio ut ipsam soluta. Ea et facilis optio voluptatem quis quia quo aliquid et. Dolores quia consequuntur ad.',
    maxVotes: 1,
    question: 'Et nobis et ut maxime eaque voluptate autem id id.',
    isRealTime: false,
  },
  {
    _id: new ObjectId('5e1e013cf9344483bc3ac349'),
    censuses: [
      new ObjectId('5e1e013cf9344483bc3ac344'),
      new ObjectId('5e1e013cf9344483bc3ac345'),
      new ObjectId('5e1e013cf9344483bc3ac346'),
      new ObjectId('5e1e013cf9344483bc3ac347'),
      new ObjectId('5e1e013cf9344483bc3ac348'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac350'),
        text: 'Nulla sit ducimus ad autem dolores cupiditate quidem at et.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34f'),
        text:
          'Et ut recusandae quis doloremque facere suscipit quos dignissimos voluptatibus.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34e'),
        text:
          'Voluptate aut consequuntur alias animi est enim magnam officia impedit.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34d'),
        text: 'Omnis quidem sit labore dolor et et fugiat cum quasi.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34c'),
        text:
          'Dolores non accusantium sit dolorem voluptas dolores debitis aut incidunt.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34b'),
        text:
          'Amet quia harum dolorum deserunt repellendus quisquam voluptatem sunt quo.',
      },
      {
        _id: new ObjectId('5e1e013cf9344483bc3ac34a'),
        text: 'Id ut porro voluptatum in ea vel aut et nam.',
      },
    ],
    start: new Date('1579024700453'),
    end: new Date('1579474800000'),
    description:
      'Cumque accusantium fuga. Eum iure totam. Sed velit magni hic commodi sint consequatur natus sit. Nulla qui perferendis aut ex officia iure dolorem itaque odit.',
    maxVotes: 1,
    question:
      'Facere quidem nulla reprehenderit qui placeat voluptatem excepturi qui veniam.',
    isRealTime: false,
  },
  {
    _id: new ObjectId('5e1e0142f9344483bc3ac3bf'),
    censuses: [
      new ObjectId('5e1e0142f9344483bc3ac3ba'),
      new ObjectId('5e1e0142f9344483bc3ac3bd'),
      new ObjectId('5e1e0142f9344483bc3ac3bc'),
      new ObjectId('5e1e0142f9344483bc3ac3bb'),
      new ObjectId('5e1e0142f9344483bc3ac3be'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0142f9344483bc3ac3c4'),
        text:
          'Architecto odio facere accusamus rerum amet incidunt voluptatem et nihil.',
      },
      {
        _id: new ObjectId('5e1e0142f9344483bc3ac3c3'),
        text:
          'Corporis voluptates asperiores aut beatae et tempora quibusdam autem laudantium.',
      },
      {
        _id: new ObjectId('5e1e0142f9344483bc3ac3c2'),
        text:
          'Commodi suscipit quaerat iusto dicta iusto rerum officia dolores doloribus.',
      },
      {
        _id: new ObjectId('5e1e0142f9344483bc3ac3c1'),
        text:
          'Rerum adipisci est eum vel blanditiis blanditiis reiciendis reiciendis ut.',
      },
      {
        _id: new ObjectId('5e1e0142f9344483bc3ac3c0'),
        text:
          'Rem dolores dolor quaerat nemo illum necessitatibus consequatur iure architecto.',
      },
    ],
    start: new Date('1579024706774'),
    end: new Date('1579474800000'),
    description:
      'Aspernatur non tempora dolore quae ut dolores aut. Amet aliquid eos odio deserunt reiciendis esse officiis. Omnis repudiandae cum ut aut.',
    maxVotes: 1,
    question:
      'Voluptas deserunt molestiae sint ea omnis illum ab debitis minus.',
    isRealTime: false,
  },
  {
    _id: new ObjectId('5e1e0147f9344483bc3ac415'),
    censuses: [
      new ObjectId('5e1e0147f9344483bc3ac411'),
      new ObjectId('5e1e0147f9344483bc3ac410'),
      new ObjectId('5e1e0147f9344483bc3ac414'),
      new ObjectId('5e1e0147f9344483bc3ac412'),
      new ObjectId('5e1e0147f9344483bc3ac413'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac41b'),
        text: 'Ut iste ut assumenda blanditiis consectetur eum dolores qui et.',
      },
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac41a'),
        text:
          'Officiis similique repellat voluptate dolores quam qui deleniti dolores quod.',
      },
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac419'),
        text:
          'Laudantium totam blanditiis consectetur quia error qui exercitationem ad id.',
      },
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac418'),
        text: 'Dicta odit aut adipisci nulla aut et impedit beatae qui.',
      },
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac417'),
        text:
          'Vel omnis sequi quia corporis repellendus qui repellat delectus doloribus.',
      },
      {
        _id: new ObjectId('5e1e0147f9344483bc3ac416'),
        text: 'Id sit eos sit omnis at numquam similique corporis maiores.',
      },
    ],
    start: new Date('1579024711297'),
    end: new Date('1579474800000'),
    description: 'Libero deleniti et eum.',
    maxVotes: 1,
    question: 'Et qui distinctio eveniet veniam quod ut ex ut quaerat.',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e014cf9344483bc3ac47b'),
    censuses: [
      new ObjectId('5e1e014cf9344483bc3ac477'),
      new ObjectId('5e1e014cf9344483bc3ac478'),
      new ObjectId('5e1e014cf9344483bc3ac476'),
      new ObjectId('5e1e014cf9344483bc3ac479'),
      new ObjectId('5e1e014cf9344483bc3ac47a'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac482'),
        text: 'Aut id veniam dolores nisi vero modi itaque aperiam dolore.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac481'),
        text:
          'Quo provident rerum voluptatum sapiente et est omnis eius ullam.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac480'),
        text:
          'Et magni vel et quibusdam veniam fugit doloribus nemo repudiandae.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac47f'),
        text:
          'Porro distinctio quos non earum quas veniam velit unde voluptas.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac47e'),
        text:
          'Ullam voluptas iste explicabo culpa voluptatem nihil eveniet aut consectetur.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac47d'),
        text:
          'Est expedita ut ipsum sapiente ipsum labore accusamus facere fugit.',
      },
      {
        _id: new ObjectId('5e1e014cf9344483bc3ac47c'),
        text: 'Aspernatur voluptas est et et aut et dolore possimus occaecati.',
      },
    ],
    start: new Date('1579024716764'),
    end: new Date('1579474800000'),
    description: 'Perferendis laboriosam qui. Quasi suscipit a qui.',
    maxVotes: 1,
    question:
      'Eligendi aut reiciendis ex voluptatem sint culpa iusto sed sint.',
    isRealTime: true,
  },
  {
    _id: new ObjectId('5e1e0153f9344483bc3ac4f1'),
    censuses: [
      new ObjectId('5e1e0153f9344483bc3ac4ec'),
      new ObjectId('5e1e0153f9344483bc3ac4ed'),
      new ObjectId('5e1e0153f9344483bc3ac4ef'),
      new ObjectId('5e1e0153f9344483bc3ac4ee'),
      new ObjectId('5e1e0153f9344483bc3ac4f0'),
    ],
    delegates: [],
    whiteVotes: 0,
    secretary: new ObjectId('5e1b187e21544de30f35531b'),
    options: [
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f7'),
        text:
          'Natus minus neque sit ipsa laborum fugiat corporis blanditiis et.',
      },
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f6'),
        text: 'Id porro ut expedita a dolores consectetur omnis aut incidunt.',
      },
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f5'),
        text:
          'Ex vitae delectus est aspernatur deleniti est molestiae dolor vel.',
      },
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f4'),
        text:
          'Delectus pariatur sit inventore a aut earum omnis quisquam quia.',
      },
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f3'),
        text: 'Earum aut qui voluptas repellat recusandae non qui rerum quo.',
      },
      {
        _id: new ObjectId('5e1e0153f9344483bc3ac4f2'),
        text:
          'Et iure voluptatem rerum et soluta minus mollitia facilis veritatis.',
      },
    ],
    start: new Date('1579024723053'),
    end: new Date('1579474800000'),
    description:
      'Consequatur minima illum nihil nulla aut corporis rerum. Fuga incidunt vitae sed eligendi sit id. Voluptates pariatur totam. Nihil quis explicabo ea totam.',
    maxVotes: 1,
    question: 'Facere omnis quia ut omnis nobis laudantium eius unde dolorem.',
    isRealTime: false,
  },
]

export = polls
