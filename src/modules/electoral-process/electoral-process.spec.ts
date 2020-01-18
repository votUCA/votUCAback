import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { getObjectId } from 'mongo-seeding'
import { TypegooseModule } from 'nestjs-typegoose'
import { addModelId, gqlRequest, TypegooseConfigService } from '../../utils'
import { GqlAuthGuard } from '../auth/gql.guard'
import { RolesGuard } from '../auth/roles.guard'
import { ConfigModule } from '../config/config.module'
import { Role } from '../users/roles.enum'
import { ElectoralProcessModule } from './electoral-process.module'

import inputElection = require('./createElection.example')

describe('ElectoralProcess Module', () => {
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
      .useValue({
        canActivate: () => true,
        handleRequest: () => ({
          _id: getObjectId('user'),
          rolesName: [Role.ADMIN],
        }),
      })
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
      const input = inputElection

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
