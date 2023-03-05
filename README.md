# supinfo-4cite

Typescript 4CITE project for SUPINFO.

## Documentation

### Backend API - Postman - Readme.md

All endpoints are documented in the Postman collection in the `./documentation` folder.
All installation and test commands are present in README.md file.

## Negative points

### Backend

- Backend coverage is not very high, nest have a lot of premade code injected and it's hard to test.
- Due to some difficulty when learning nestjs, we could have missed some basic functionality needed.

### Frontend

- Our frontend developer never done react before but wanted to learn, we accept feedback for him to improve.
- Same as backend, some functionality could be not tested.

### Pipeline

- We got no time for pipeline, sadly.

# Backend Installation

**Requirements :**

- Updated NodeJS
- Updated Node Package Manager
- Docker

```bash
# Start the database with docker compose in the src/database folder
$ cd database
$ docker compose up
```

```bash
# Update the node_modules in the src/backend-api folder
$ cd backend-api
$ npm ci
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
