import { INestApplication, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import { TypegooseModule } from 'nestjs-typegoose'
import { _10_MB } from '../common/constants'
import { UploadScalar } from '../common/scalars'
import { seedDB, TypegooseConfigService, gqlRequest } from '../utils'
import { AuthModule } from './auth/auth.module'
import { CandidatesModule } from './candidates/candidates.module'
import { CensusModule } from './census/census.module'
import { ColegiateBodiesModule } from './colegiate-bodies/colegiate-bodies.module'
import { ConfigModule } from './config/config.module'
import { ElectoralProcessModule } from './electoral-process/electoral-process.module'
import { FilesModule } from './files/files.module'
import { UsersModule } from './users/users.module'

describe('App Module', () => {
  let app: INestApplication
  let accessToken: string

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypegooseModule.forRootAsync({
          useClass: TypegooseConfigService,
        }),
        GraphQLModule.forRootAsync({
          useFactory: () => ({
            autoSchemaFile: true,
            context: ({ req }): object => ({ req }),
            debug: false,
            playground: false,
            uploads: {
              maxFileSize: _10_MB,
              maxFiles: 5,
            },
          }),
        }),
        UsersModule,
        AuthModule,
        FilesModule,
        ElectoralProcessModule,
        CandidatesModule,
        CensusModule,
        ColegiateBodiesModule,
      ],
      providers: [UploadScalar],
    }).compile()

    app = appModule.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    useContainer(app, { fallbackOnErrors: true })
    await app.init()
    await seedDB()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Mutations', () => {
    it('login', () => {
      const loginQuery = /* GraphQL */ `
        mutation login($input: LoginInput!) {
          login(input: $input) {
            accessToken
          }
        }
      `
      return gqlRequest(
        app.getHttpServer(),
        {
          query: loginQuery,
          variables: {
            input: {
              uid: 'u20192020',
              password: 'votUCA?0!9',
            },
          },
        },
        body => {
          accessToken = body.data.login.accessToken
          expect(accessToken).toBeTruthy()
          expect(body.errors).toBeFalsy()
        }
      )
    })
  }) // Mutations

  describe('Queries', () => {
    it('When users is requested, should return a User list', () => {
      const query = /* GraphQL */ `
        query users {
          users {
            id
            uid
            firstName
            lastName
            roles
          }
        }
      `
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.users).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              uid: expect.stringMatching(/^u(?:[0-9]{8}|[xyz][0-9]{7})/),
              firstName: expect.any(String),
              lastName: expect.any(String),
              roles: expect.arrayContaining([expect.any(String)]),
            }),
          ])
        )
      })
    })
  }) // Queries
})
