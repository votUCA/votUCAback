import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { getObjectId } from 'mongo-seeding'
import { TypegooseModule } from 'nestjs-typegoose'
import {
  addModelId,
  getModelId,
  gqlRequest,
  TypegooseConfigService,
} from '../../utils'
import { GqlAuthGuard } from '../auth/gql.guard'
import { RolesGuard } from '../auth/roles.guard'
import { ConfigModule } from '../config/config.module'
import { Role } from '../users/roles.enum'
import electionInput from './election.spec.input'
import { ElectoralProcessModule } from './electoral-process.module'

describe('Election Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const electionModule: TestingModule = await Test.createTestingModule({
      imports: [
        ElectoralProcessModule,
        ConfigModule,
        TypegooseModule.forRootAsync({ useClass: TypegooseConfigService }),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          context: ({ req }): object => {
            req.user = {
              _id: getObjectId('user'),
              rolesName: [Role.ADMIN],
            }
            return { req }
          },
        }),
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile()

    app = electionModule.createNestApplication()
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

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input: electionInput } },
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

  describe('Queries', () => {
    it('When elections is requested, should return a election list', () => {
      const query = /* GraphQL */ `
        query elections {
          elections {
            id
          }
        }
      `
      return gqlRequest(app.getHttpServer(), { query }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.elections).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
            }),
          ])
        )
      })
    })

    it('When election is requested, should return a election', () => {
      const input = getModelId('election', 0)
      const query = /* GraphQL */ `
        query election($input: ID!) {
          election(id: $input) {
            id
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.election).toMatchObject({
            id: expect.stringMatching(input),
          })
        }
      )
    })

    it('When modifyElection is requested, should return the Election modified', () => {
      const query = /* GraphQL */ `
        mutation modifyElection($input: UpdateElectionInput!, $id: ID!) {
          modifyElection(input: $input, id: $id) {
            id
            description
          }
        }
      `
      const input = {
        description: 'Descripcion nueva',
      }
      const id = getModelId('election', 0)

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input, id } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.modifyElection).toMatchObject({
            id: expect.stringMatching(id),
            description: expect.stringMatching('Descripcion nueva'),
          })
        }
      )
    })
  })
})
