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

# Frontend Installation

## Execution

Le projet s'exécute avec la commande "npm run dev" après avoir executé le backend et la base de donnée.

## Ce qui est fait

Les systèmes de connexions, déconnexion, mise à jour du mot de passe, ajout et récupération des hôtels sont fonctionnels.

## Ce qui n'est pas fait

Les hotels ne s'affichent pas sur la page d'accueil alors que les données sont bien récupérés.
Le système de booking n'est pas présent.
Les tests sont très succincts

Nous avons décidés que je (Clément) me chargerai du front end en react alors que je n'en avais jamais fait. J'ai sous estimé l'ampleur du projet et la dizaine d'heure où je n'ai pas pu avancé m'a empêché de rendre le travail que je voulais même en y aillant passé tout mon temps libre.Ce front end représente tout ce que j'ai pu apprendre sur ce framework.

## Commands

```bash
# Run the frontend
$ npm run start
# Run the tests
$ npm run test
```
