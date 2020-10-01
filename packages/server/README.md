# Fullstack-Users - Server

## Description

Server backend for Fullstack-Users. Based on [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Building

```bash
$ npm run build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Highlights

* Unit tests for UserService are available in [packages\server\src\users\users.service.spec.ts](packages\server\src\users\users.service.spec.ts)
* e2e tests are available in [packages\server\test\app.e2e-spec.ts](packages\server\test\app.e2e-spec.ts)
* [packages\server\src\main.ts](packages\server\src\main.ts)
  * Initialization of logger, monitoring, auto DTO validation, get client IP, security, RabbitMQ connection, Swagger
* [Monitoring Page](http://localhost:3000/status)
* Prevent user creation for IP outside of France
  * [packages\server\src\guards\france-request.guard.ts](packages\server\src\guards\france-request.guard.ts)
  * [packages\server\src\users\users.controller.ts](packages\server\src\users\users.controller.ts)
* RabbitMQ sending
  * [packages\server\src\queue\queue.service.ts](packages\server\src\queue\queue.service.ts)
  * [packages\server\src\users\users.service.ts](packages\server\src\users\users.service.ts)
* Environment variables
  * [packages\server\src\app.module.ts](packages\server\src\app.module.ts)
  * [packages\server\.env.example](packages\server\.env.example)
* Swagger / OpenAPI
  * [http://localhost:3000/api](http://localhost:3000/api)

## Stay in touch

- Author - [Guillaume Roy](https://github.com/guillaume-roy)