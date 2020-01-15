declare namespace NodeJS {
  export interface Global {
    __MODELS__: {
      [key: string]: string[]
    }
    __MONGO_URI__: string
    __MONGO_DB_NAME__: string
  }
}
