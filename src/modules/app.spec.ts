import { INestApplication, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import { TypegooseModule } from 'nestjs-typegoose'
import { _10_MB } from '../common/constants'
import { UploadScalar } from '../common/scalars'
import { gqlRequest, seedDB, TypegooseConfigService } from '../utils'
import { AuthModule } from './auth/auth.module'
import { CandidatesModule } from './candidates/candidates.module'
import { CensusModule } from './census/census.module'
import { ColegiateBodiesModule } from './colegiate-bodies/colegiate-bodies.module'
import { ConfigModule } from './config/config.module'
import { ElectoralProcessModule } from './electoral-process/electoral-process.module'
import { FilesModule } from './files/files.module'
import { UsersModule } from './users/users.module'
import {
  usersQuery,
  colegiateBodiesQuery,
  censusesQuery,
  pendingElectoralProcessesQuery,
  voteElectionQuery,
  votePollQuery,
  loginQuery,
} from './querys-test/short-queries'
import { electionsQuery } from './querys-test/electionsQuery'
import { pollsQuery } from './querys-test/pollsQuery'

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
      const query = loginQuery
      return gqlRequest(
        app.getHttpServer(),
        {
          query,
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
      const query = usersQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.users).toBeTruthy()
      })
    })

    it('When colegiateBodies is requested, should return a colegiateBody list', () => {
      const query = colegiateBodiesQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.colegiateBodies).toBeTruthy()
      })
    })

    it('When censuses is requested, should return a census list', () => {
      const query = censusesQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.censuses).toBeTruthy()
      })
    })

    it('When elections is requested, should return a election list', () => {
      const query = electionsQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.elections).toBeTruthy()
      })
    })

    it('When polls is requested, should return a poll list', () => {
      const query = pollsQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.polls).toBeTruthy()
      })
    })

    it('When pendingElectoralProcesses is requested, should return a electoralProcess list', () => {
      const query = pendingElectoralProcessesQuery
      return gqlRequest(app.getHttpServer(), { query, accessToken }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.pendingElectoralProcesses).toBeTruthy()
      })
    })

    it('When voteOnElection is requested, should return a error', () => {
      const query = voteElectionQuery
      const variables = {
        input: {
          election: '5e1e0158f9344483bc3ac557',
          candidates: ['5e1e0158f9344483bc3ac55e'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, variables, accessToken },
        body => {
          expect(body.errors).toBeTruthy()
          expect(body.data).toBeFalsy()
        }
      )
    })

    it('When voteOnPoll is requested, should return a error', () => {
      const query = votePollQuery
      const variables = {
        input: {
          poll: '5e1e012cf9344483bc3ac21b',
          options: ['5e1e012cf9344483bc3ac21e'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, accessToken, variables },
        body => {
          expect(body.errors).toBeTruthy()
          expect(body.data).toBeFalsy()
        }
      )
    })

    it('login with wrong credentials, should throw an error', () => {
      const query = loginQuery
      return gqlRequest(
        app.getHttpServer(),
        {
          query,
          variables: {
            input: {
              uid: 'A20192066',
              password: '20192066A',
            },
          },
        },
        body => {
          expect(body.data).toBeFalsy()
          expect(body.errors).toBeTruthy()
        }
      )
    })

    it('When passing wrong accessToken, should throw an error', () => {
      return gqlRequest(
        app.getHttpServer(),
        {
          query: votePollQuery,
          accessToken: `${accessToken}wrong`,
        },
        body => {
          expect(body.errors).toBeTruthy()
          expect(body.data).toBeFalsy()
        }
      )
    })

    it('login with another user', () => {
      const query = loginQuery
      return gqlRequest(
        app.getHttpServer(),
        {
          query,
          variables: {
            input: {
              uid: 'u20192066',
              password: 'user20192066',
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

    it('When voteOnElection is requested, should return true', () => {
      const query = voteElectionQuery
      const variables = {
        input: {
          election: '5e1e0163f9344483bc3ac63e',
          candidates: ['5e1e0163f9344483bc3ac644'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, variables, accessToken },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.voteOnElection).toBeTruthy()
        }
      )
    })
    it('When voteOnPoll is requested, should return true', () => {
      const query = votePollQuery
      const variables = {
        input: {
          poll: '5e1e013cf9344483bc3ac349',
          options: ['5e1e013cf9344483bc3ac350'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, accessToken, variables },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.voteOnPoll).toBeTruthy()
        }
      )
    })

    it('When voteOnElection is requested, should return error', () => {
      const query = voteElectionQuery
      const variables = {
        input: {
          election: '5e1e0163f9344483bc3ac63e',
          candidates: ['5e1e0163f9344483bc3ac644'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, variables, accessToken },
        body => {
          expect(body.errors).toBeTruthy()
          expect(body.data).toBeFalsy()
        }
      )
    })

    it('When voteOnPoll is requested, should return error', () => {
      const query = votePollQuery
      const variables = {
        input: {
          poll: '5e1e013cf9344483bc3ac349',
          options: ['5e1e013cf9344483bc3ac350'],
        },
      }
      return gqlRequest(
        app.getHttpServer(),
        { query, accessToken, variables },
        body => {
          expect(body.errors).toBeTruthy()
          expect(body.data).toBeFalsy()
        }
      )
    })

    it('When secretary of a poll is requested, should return user that is secretary', () => {
      const input = '5e1e013cf9344483bc3ac349'
      const query = /* GraphQL */ `
        query testSecretary($input: ID!) {
          poll(id: $input) {
            secretary {
              id
              roles
            }
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, accessToken, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.poll.secretary).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              roles: expect.any(Array),
            })
          )
          expect(String(body.data.poll.secretary.roles)).toMatch(
            /^ADMIN|SECRETARY$/
          )
        }
      )
    })
  }) // Queries
})
