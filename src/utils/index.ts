import * as supertest from 'supertest'

export type sendData = {
  operationName?: string
  query: string
  variables?: { [key: string]: any }
}

export type expectBody = {
  data?: { [key: string]: any }
  errors?: { [key: string]: any }
}

export type expectFunc = (body: expectBody) => void

export const gqlRequest = (
  httpServer: any,
  { operationName = null, ...rest }: sendData,
  expect: expectFunc
): supertest.Test => {
  return supertest(httpServer)
    .post('/graphql')
    .send({ operationName, ...rest })
    .expect(({ body }) => {
      expect(body)
    })
}
