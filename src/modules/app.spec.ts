import { INestApplication, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import { TypegooseModule } from 'nestjs-typegoose'
import * as request from 'supertest'

import { seedDB, TypegooseConfigService } from '../utils'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'

describe('App Module', () => {
  let app: INestApplication
  let accessToken: string

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypegooseModule.forRootAsync({ useClass: TypegooseConfigService }),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          debug: false,
          playground: false,
          context: ({ req }) => ({ req }),
        }),
        AuthModule,
      ],
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
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: loginQuery,
          variables: {
            input: {
              email: 'u20192020',
              password: 'votUCA?0!9',
            },
          },
        })
        .expect(({ body }) => {
          accessToken = body.data.login.accessToken
          expect(accessToken).toBeTruthy()
          expect(body.errors).toBeFalsy()
        })
    })
  }) // Mutations

  describe('Queries', () => {
    it('When users is requested, should return a UserConnection', () => {
      const usersQuery = /* GraphQL */ `
        query {
          users {
            id
            firstName
            lastName
            uid
          }
        }
      `
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ operationName: null, query: usersQuery })
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy()
          expect(body.data.users).toMatchObject({
            edges: expect.arrayContaining([
              expect.objectContaining({
                node: {
                  id: expect.any(String),
                  firstName: expect.any(String),
                  lastName: expect.any(String),
                  uid: expect.any(String),
                },
              }),
            ]),
          })
        })
    })
  }) // Queries
})
