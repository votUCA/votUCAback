<p align="center">
  <a href="https://github.com/PINF2019/backed" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" width="320" alt="Backed Logo" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg?label=nestjs&style=flat-square" alt="NestJS Version" /></a>
<a href="https://www.npmjs.com/type-graphql" target="_blank"><img src="https://img.shields.io/npm/v/type-graphql.svg?label=type-graphql&style=flat-square" alt="TypeGraphQL Version" /></a>
<a href="https://www.npmjs.com/typescript" target="_blank"><img src="https://img.shields.io/npm/v/typescript.svg?label=typescript&style=flat-square" alt="Typescript Version" /></a>
<a href="https://www.npmjs.com/@typegoose/typegoose" target="_blank"><img src="https://img.shields.io/npm/v/@typegoose/typegoose.svg?label=typegoose&style=flat-square" alt="Typegoose Version" /></a>
<a href="https://www.npmjs.com/apollo-server-express" target="_blank"><img src="https://img.shields.io/npm/v/apollo-server-express.svg?label=apollo-server-express&style=flat-square" alt="Apollo Server Version" /></a>
<a href="https://www.npmjs.com/graphql" target="_blank"><img src="https://img.shields.io/npm/v/graphql.svg?label=graphql&style=flat-square" alt="GraphQL Version" /></a>
<a href="https://microbadger.com/images/mongo:4.2.0" alt="MongoDB Version"><img src="https://img.shields.io/badge/mongodb-4.2.0-blue?style=flat-square"></a>
<a href="https://nodejs.org/" alt="Node Version"><img src="https://img.shields.io/badge/node-12.13.0-blue?style=flat-square"></a>
<a href="https://nodejs.org/" alt="Yarn Version"><img src="https://img.shields.io/github/v/release/yarnpkg/yarn?label=yarn&sort=semver&style=flat-square"></a>
</p>

## Prerequisites

### Node

If you don't have node yet, install using [nvm](https://github.com/nvm-sh/nvm#installation-and-update)

### Yarn

```bash
$ npm -g install yarn
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start mongodb from docker
$ yarn start:mongo

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Code Style

This project use [standardjs](https://standardjs.com/) code style

### Formatting

This project has configured `eslint + prettier` to follow the standardjs code style

If you use VSCode add the following to your settings to autoformat on save

```json
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
```

### How to commit

This project is going to use [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/) as commit format to help us create changelogs

#### Example

```
git commit -m "chore: update dependencies"
```

#### If you don't know the coventionalcommits syntax:

Install commitizen as global utility

```
yarn global add commitizen cz-conventional-changelog
```

Create a `.czrc` file in your home directory, with `path` referring to cz-conventional-changelog

```
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

Commiting with commitizen prompt

<p align="center">
<img src="https://raw.githubusercontent.com/commitizen/cz-cli/master/meta/screenshots/add-commit.png">
<p>

> with this approach use always the terminal
>
> If the commands doesn't work add the following line `export PATH="$PATH:$(yarn global bin)"` to your .bashrc or .zshrc

## Built With

### [TypeScript](http://www.typescriptlang.org/)

TypeScript is a superset of JavaScript which primarily provides optional static typing, classes and interfaces

### [NestJS](https://nestjs.com/)

A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications on top of TypeScript.

### [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source

### [GraphQL](https://graphql.org/learn/)

GraphQL is a syntax that describes how to ask for data, and is generally used to load data from a server to a client

### [TypeGraphQL](https://typegraphql.ml/)

Allow us to create GraphQL schema and resolvers with TypeScript, using classes and decorators

### [MongoDB](https://www.mongodb.com/)

MongoDB is a document database with provide us scalability and flexibility

### [Typegoose](https://typegoose.github.io/typegoose/)

Typegoose is a wrapper for mongoose’s models

### [Mongoose](https://mongoosejs.com/)

Mongoose provides a straight-forward, schema-based solution to model our application data
