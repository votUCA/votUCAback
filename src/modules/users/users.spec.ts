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
import { UsersModule } from './users.module'

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
    it('When createUsers is requested, should return the User created', () => {
      const query = /* GraphQL */ `
        mutation createUser($input: UserInput!) {
          createUser(input: $input) {
            id
          }
        }
      `
      const input = {
        uid: 'u20192020',
        dni: '20192020U',
        password: 'votuca',
        firstName: 'Pepe',
        lastName: 'Perez',
        roles: 'VOTER',
        colegiateBody: getObjectId('colegiateBody').toHexString(),
        genre: 'MALE',
      }

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          addModelId('user', body.data.createUser.id)
          expect(body.data.createUser).toMatchObject({
            id: expect.any(String),
          })
        }
      )
    })
  })

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
      return gqlRequest(app.getHttpServer(), { query }, body => {
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

    it('When user is requested, should return a User', () => {
      const input = getModelId('user', 0)
      const query = /* GraphQL */ `
        query user($input: ID!) {
          user(id: $input) {
            id
            firstName
            lastName
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.user).toMatchObject({
            id: expect.stringMatching(input),
          })
        }
      )
    })

    it('When modifyUser is requested, should return the User modified', () => {
      const query = /* GraphQL */ `
        mutation modifyUser($input: UserUpdateInput!, $id: ID!) {
          modifyUser(input: $input, id: $id) {
            id
            lastName
          }
        }
      `
      const input = {
        lastName: 'Sánchez',
      }
      const id = getModelId('user', 0)

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input, id } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.modifyUser).toMatchObject({
            id: expect.stringMatching(id),
            lastName: expect.stringMatching('Sánchez'),
          })
        }
      )
    })
  })

  describe('Deleter', () => {
    it('When deleteUser is requested, should return the User deleted', () => {
      const input = getModelId('user', 0)
      const query = /* GraphQL */ `
        mutation deleteUser($input: ID!) {
          deleteUser(id: $input) {
            id
          }
        }
      `

      return gqlRequest(
        app.getHttpServer(),
        { query, variables: { input } },
        body => {
          expect(body.errors).toBeFalsy()
          expect(body.data.deleteUser).toMatchObject({
            id: expect.stringMatching(input),
          })
          expect(body.data.user).toBeUndefined()
        }
      )
    })
  })
})
