import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
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
import { UsersModule } from '../users/users.module'

describe('Users Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule,
        TypegooseModule.forRootAsync({ useClass: TypegooseConfigService }),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile()

    app = usersModule.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Mutations', () => {
    it('When createColegiateBody is requested, should return the ColegiateBody created', () => {
      const query = /* GraphQL */ `
        mutation createColegiateBody($input: ColegiateBodyInput!) {
          createColegiateBody(input: $input) {
            id
          }
        }
      `
      const input = {
        name: 'PAS',
      }

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          addModelId('colegiateBody', body.data.createColegiateBody.id)
          expect(body.data.createColegiateBody).toMatchObject({
            id: expect.any(String),
          })
        }
      )
    })
  })

  describe('Queries', () => {
    it('When colegiateBodies is requested, should return a colegiateBody list', () => {
      const query = /* GraphQL */ `
        query colegiateBodies {
          colegiateBodies {
            id
            name
          }
        }
      `
      return gqlRequest(app.getHttpServer(), { query }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.colegiateBodies).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
            }),
          ])
        )
      })
    })

    it('When colegiateBody is requested, should return a colegiateBody', () => {
      const input = getModelId('colegiateBody', 0)
      const query = /* GraphQL */ `
        query colegiateBody($input: ID!) {
          colegiateBody(id: $input) {
            id
            name
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.colegiateBody).toMatchObject({
            id: expect.stringMatching(input),
          })
        }
      )
    })
  })
})
