import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { GraphQLModule } from '@nestjs/graphql'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersModule } from './users.module'
import { GqlAuthGuard } from '../auth/gql.guard'
import { ConfigModule } from '../config/config.module'
import { gqlRequest, TypegooseConfigService } from '../../utils'

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
      .compile()

    app = usersModule.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
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
  })
})
