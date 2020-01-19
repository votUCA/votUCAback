import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { getObjectId } from 'mongo-seeding'
import { TypegooseModule } from 'nestjs-typegoose'
import { ObjectId } from 'mongodb'
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
import { ElectoralProcessModule } from './electoral-process.module'
import electionInput from './election.spec.input'

import pollSpec from './poll.spec.input'

describe('ElectoralProcess Module', () => {
  let app: INestApplication
  let closedPollId: ObjectId

  beforeAll(async () => {
    const electoralProcessModule: TestingModule = await Test.createTestingModule(
      {
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
      }
    )
      .overrideGuard(GqlAuthGuard)
      .useValue({
        canActivate: () => true,
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

    it('When createPoll is requested, should return the Poll created (closed)', () => {
      const query = /* GraphQL */ `
        mutation createPoll($input: PollInput!) {
          createPoll(input: $input) {
            id
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input: pollSpec.closedPoll } },
        body => {
          expect(body.errors).toBeFalsy()
          addModelId('poll', body.data.createPoll.id)
          closedPollId = body.data.createPoll.id
          expect(body.data.createPoll).toMatchObject({
            id: expect.any(String),
          })
        }
      )
    })

    it('When modifyPoll is requested, should return the Poll modified', () => {
      const query = /* GraphQL */ `
        mutation modifyPoll($input: UpdatePollInput!, $id: ID!) {
          modifyPoll(input: $input, id: $id) {
            id
            question
            description
          }
        }
      `
      const input = {
        question: 'Pregunta actualizada',
        description: 'Descripcion nueva',
      }
      const id = getModelId('poll', 0)

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input, id } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.modifyPoll).toMatchObject({
            id: expect.stringMatching(id),
            question: expect.stringMatching('Pregunta actualizada'),
            description: expect.stringMatching('Descripcion nueva'),
          })
        }
      )
    })
  })

  describe('Queries', () => {
    it('When polls is requested, should return a poll list', () => {
      const query = /* GraphQL */ `
        query polls {
          polls {
            id
          }
        }
      `
      return gqlRequest(app.getHttpServer(), { query }, body => {
        expect(body.errors).toBeFalsy()
        expect(body.data.polls).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
            }),
          ])
        )
      })
    })

    it('When poll is requested, should return a poll', () => {
      const input = getModelId('poll', 0)
      const query = /* GraphQL */ `
        query poll($input: ID!) {
          poll(id: $input) {
            id
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.poll).toMatchObject({
            id: expect.stringMatching(input),
          })
        }
      )
    })

    it('When invalid poll is requested, should return a error', () => {
      const input = new ObjectId('5e1b187e21544de30f35531b') // id supuestamente no válido
      const query = /* GraphQL */ `
        query poll($input: ID!) {
          poll(id: $input) {
            id
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeTruthy()
        }
      )
    })

    it('When pending polls is requested, should return the pending to vote polls of the user', () => {
      const query = /* GraphQL */ `
        query pendingPolls {
          pendingPolls {
            id
          }
        }
      `

      return gqlRequest(app.getHttpServer(), { query }, body => {
        expect(body.errors).toBeFalsy()
      })
    })

    it('When censuses of a poll is requested, should return censuses of a poll', () => {
      const input = getModelId('poll', 0)
      const query = /* GraphQL */ `
        query testCensuses($input: ID!) {
          poll(id: $input) {
            censuses {
              id
            }
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.poll.censuses).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
              }),
            ])
          )
        }
      )
    })

    it('When results of a poll is requested, should return results of a poll', () => {
      const input = closedPollId
      const query = /* GraphQL */ `
        query testPollResults($input: ID!) {
          poll(id: $input) {
            results {
              voters
              results {
                votes
                option {
                  id
                }
              }
            }
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.poll.results).toEqual(
            expect.objectContaining({
              voters: expect.any(Number),
              results: expect.arrayContaining([
                expect.objectContaining({
                  votes: expect.any(Number),
                  option: expect.objectContaining({
                    id: expect.any(String),
                  }),
                }),
              ]),
            })
          )
        }
      )
    })

    it('When delegates of a poll is requested, should return the delegates of that poll', () => {
      const input = getModelId('poll', 0)
      const query = /* GraphQL */ `
        query testDelegates($input: ID!) {
          poll(id: $input) {
            delegates {
              id
            }
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
        }
      )
    })
  })

  describe('Deleter', () => {
    it('When deletePoll is requested, should return the Poll deleted', () => {
      const input = getModelId('poll', 0)
      const query = /* GraphQL */ `
        mutation deletePoll($input: ID!) {
          deletePoll(id: $input)
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.poll).toBeUndefined()
        }
      )
    })

    it('When deletePoll is requested with an incorrect id, should return error', () => {
      const input = '5e1b187e21544de30f35531b'
      const query = /* GraphQL */ `
        mutation deletePoll($input: ID!) {
          deletePoll(id: $input)
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeTruthy()
        }
      )
    })
  })
})
