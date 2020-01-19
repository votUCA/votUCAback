process.env.TEST = 'Test' // set TEST variable to create testing database

module.exports = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/jest.mongo.enviroment',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts$',

  collectCoverage: false,
  // load enviroment variables from .env
  setupFiles: ['dotenv/config'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/tests/**',
  ],
}
