import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.modules";
import { Token, TokenStructure } from "src/auth/dto/auth.dto";
import { JWT_SECRET } from "src/auth/utils/constant";
import * as request from 'supertest';
import { HotelsModule } from "../hotels.module";
import {Hotel} from '../entities/hotel.entity'
let jwt = require('jsonwebtoken');

async function GenerateToken(params: TokenStructure): Promise<Token> {
  return await jwt.sign({
    id: params.id,
    role: params.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, JWT_SECRET);
}

describe('HotelController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture = await Test.createTestingModule({
      imports: [HotelsModule, AuthModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [Hotel],
        synchronize: true,
      }),],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/register (POST) - Customer', () => {
    const payload = customerData
    return request(app.getHttpServer())
      .post('/register')
      .send(payload)
      .expect(res => {
        if (res.statusCode === 400) {
          expect(res.text).toEqual("{\"message\":\"User may already exist\"}")
        } else {
          expect(res.statusCode).toBe(201)
        }
      })
  });
});
