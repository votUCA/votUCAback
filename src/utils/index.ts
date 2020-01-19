import * as supertest from 'supertest'
import * as path from 'path'
import { Seeder } from 'mongo-seeding'

export * from './config'

export type sendData = {
  operationName?: string
  query: string
  variables?: { [key: string]: any }
  accessToken?: string
}

export type expectBody = {
  data?: { [key: string]: any }
  errors?: { [key: string]: any }
}

export type expectFunc = (body: expectBody) => void

export const gqlRequest = (
  httpServer: any,
  { operationName = null, accessToken = '', ...rest }: sendData,
  expect: expectFunc
): supertest.Test => {
  return supertest(httpServer)
    .post('/graphql')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ operationName, ...rest })
    .expect(({ body }) => {
      expect(body)
    })
}

export const addModelId = (model: string, objectid: string): void => {
  if (model in global.__MODELS__) {
    global.__MODELS__[model].push(objectid)
  } else {
    global.__MODELS__[model] = [objectid]
  }
}

export const getModelIds = (model: string): string[] => global.__MODELS__[model]

export const getModelId = (model: string, index: number): string =>
  global.__MODELS__[model][index]

export const restartModels = (): void => {
  global.__MODELS__ = {}
}

export const seedDB = async (): Promise<void> => {
  const seeder = new Seeder({
    database: global.__MONGO_URI__,
  })

  const collections = seeder.readCollectionsFromPath(
    path.resolve('src/seeder/data'),
    {
      extensions: ['ts'],
    }
  )
  try {
    await seeder.import(collections, { dropDatabase: true })
  } catch {
    console.warn('Unable to seed database')
  }
}
