import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../../src/auth/auth.modules';
import { User } from './../../src/users/entities/users.entity';
import { LoginData, RegisterData } from './data.mock';
import { LoginUserDto } from './../../src/auth/dto/auth.dto';

let jwt = require('jsonwebtoken');

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [User],
        synchronize: true,
      }),],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/register (POST) - Bad password', () => {
    const payload = RegisterData
    return request(app.getHttpServer())
      .post('/register')
      .send(payload)
      .expect(400)
  });


  it('/login (POST)', () => {
    const payload: LoginUserDto = LoginData
    return request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(201)
  });

  afterAll(async () => {
    await app.close();
  });

});

