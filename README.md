# supinfo-4cite

Typescript 4CITE project for SUPINFO.

## Local Installation

### Backend API

**Requirements :**

- Updated NodeJS
- Updated Node Package Manager
- Docker

**Setup :**

```bash
# Clone the repository
# Go to the database folder
# Run the database container
# Go to the backend-api folder
# Install node modules
# Run the server

git clone https://github.com/NathanRodet/supinfo-4cite.git
cd supinfo-4cite/database
docker-compose up -d
cd ..
cd /backend-api
npm ci
npm run start:dev
```

## Documentation

### Postman

All endpoints are documented in the Postman collection in the `/backend-api/documentation` folder.


