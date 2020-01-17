import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { TypegooseModule } from 'nestjs-typegoose'
import { addModelId, gqlRequest, TypegooseConfigService } from '../../utils'
import { GqlAuthGuard } from '../auth/gql.guard'
import { RolesGuard } from '../auth/roles.guard'
import { ConfigModule } from '../config/config.module'
import { ElectoralProcessModule } from './electoral-process.module'

describe('Electoral process Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const electoralProcessModule: TestingModule = await Test.createTestingModule(
      {
        imports: [
          ElectoralProcessModule,
          ConfigModule,
          TypegooseModule.forRootAsync({ useClass: TypegooseConfigService }),
          GraphQLModule.forRoot({
            autoSchemaFile: true,
          }),
        ],
      }
    )
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile()

    app = electoralProcessModule.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Mutations', () => {
    it('When createElection is requested, should return the Election created', () => {
      const query = /* GraphQL */ `
        mutation createElection($input: ElectionInput!) {
          createElection(input: $input) {
            id
          }
        }
      `
      const input = {
        censuses: [
          {
            group: 'Computadores',
            location: 'ESI',
            date: '2019-12-31 01:00:00',
            voters: [
              {
                uid: '5e0a8ca614c0de10784a3303',
                firstName: 'Prueba',
                lastName: 'Prueba2',
                dni: '12344556',
              },
              {
                uid: '5e0a906789b5241078237856',
                firstName: 'Prueba3',
                lastName: 'Prueba4',
                dni: '12344566',
              },
            ],
          },
        ],
        maxVotes: 10,
        start: '2019-12-31 01:00:00',
        end: '2020-01-05 23:59:59',
        description: 'Elección de prueba',
        delegates: ['5e0a8ca614c0de10784a3303', '5e0a906789b5241078237856'],
        candidates: [
          {
            firstName: 'Prueba',
            lastName: 'Prueba2',
          },

          {
            firstName: 'Paco',
            lastName: 'Paco2',
          },
        ],
      }

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          addModelId('election', body.data.createElection.id)
          expect(body.data.createElection).toMatchObject({
            id: expect.any(String),
          })
        }
      )
    })
  })
})
