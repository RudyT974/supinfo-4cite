import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token, TokenStructure } from '../../src/auth/dto/auth.dto';
import { AuthModule } from '../../src/auth/auth.modules';
import Booking from '../../src/bookings/entities/booking.entity';
import { BookingsModule } from '../../src/bookings/booking.module';
import { decoded_admin, decoded_customer, HotelData1 } from './data.mock';
import { JWT_SECRET } from '../../src/auth/utils/constant';
import { HotelsModule } from '../../src/hotels/hotels.module';
import {Hotel} from '../../src/hotels/entities/hotel.entity'
import { UpdateHotelDto } from '../../src/hotels/dto/update-hotel.dto';


let jwt = require('jsonwebtoken');

async function GenerateToken(params: TokenStructure): Promise<Token> {
  return await jwt.sign({
    id: params.id,
    role: params.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, JWT_SECRET);
}

describe('UserController (e2e)', () => {
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

  it('/hotels (POST)', async() => {
    const payload = HotelData1
    const token = await GenerateToken(decoded_admin);
    return request(app.getHttpServer())
      .post('/hotels')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(res => {
        if (res.statusCode === 400) {
          expect(res.text).toEqual("{\"message\":\"Hotel may already exist\"}")
        } else {
          expect(res.statusCode).toBe(201)
        }
      })
  });

  it('/hotels (GET) - No Auth', async () => {
    return await request(app.getHttpServer()).get('/hotels').expect(401);
  });

  it('/hotels (GET) - Customer', async () => {
    const token = await GenerateToken(decoded_customer);
    return await request(app.getHttpServer()).get('/hotels').set('Authorization', `Bearer ${token}`).expect(403);
  });
  
  it('/hotels (GET) - Admin', async () => {
    const token = await GenerateToken(decoded_admin);
    return await request(app.getHttpServer()).get('/hotels').set('Authorization', `Bearer ${token}`).expect(200);
  });

  it('/hotels PATCH - Admin', async() =>{
    const token = await GenerateToken(decoded_admin);
    return request(app.getHttpServer())
      .post('/hotels')
      .set('Authorization', `Bearer ${token}`)
      .send(UpdateHotelDto.length.toString)
      .expect(res => {
        if (res.statusCode === 400) {
          expect(res.text).toEqual(400)
        } else {
          expect(res.statusCode).toBe(201)
        }
      })
  });
})