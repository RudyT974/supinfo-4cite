import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { User } from './../src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [User],
        synchronize: true,
      })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) - Health Check', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

});

