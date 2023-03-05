# supinfo-4cite

Typescript 4CITE project for SUPINFO.

## Documentation

### Backend API - Postman - Readme.md

All endpoints are documented in the Postman collection in the `./documentation` folder.
All installation and test commands are present in README.md file.

### Frontend - Readme.md

All installation and test commands are present in README.md file.

### Pipeline - Readme.md

All installation and test commands are present in README.md file.

## Negative points

### Backend

- Backend coverage showed must not be true.

### Frontend

-

### Pipeline

-

# Backend Installation

**Requirements :**

- Updated NodeJS
- Updated Node Package Manager
- Docker

```bash

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
