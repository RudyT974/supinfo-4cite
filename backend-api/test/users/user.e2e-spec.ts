import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/users.entity';
import {
  adminData, badEmail, badPass, customerData,
  decoded_admin, decoded_customer, decoded_employee,
  decoded_random, employeeData
} from './data.mock';
import { UsersModule } from '../../src/users/users.module';
import { Token, TokenStructure } from '../../src/auth/dto/auth.dto';
import { JWT_SECRET } from '../../src/auth/utils/constant';
import { AuthModule } from '../../src/auth/auth.modules';
import { LoginData } from '../auth/data.mock';


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
      imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
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

  // Test user registration for all roles

  it('/register (POST) - Bad password', () => {
    const payload = badPass
    return request(app.getHttpServer())
      .post('/register')
      .send(payload)
      .expect(400)
  });

  it('/register (POST) - Bad email', () => {
    const payload = badEmail
    return request(app.getHttpServer())
      .post('/register')
      .send(payload)
      .expect(400)
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

  it('/register/employee (POST) - Employee', () => {
    const payload = employeeData
    return request(app.getHttpServer())
      .post('/register/employee')
      .send(payload)
      .expect(res => {
        if (res.statusCode === 400) {
          expect(res.text).toEqual("{\"message\":\"User may already exist\"}")
        } else {
          expect(res.statusCode).toBe(201)
        }
      })
  });

  it('/register/admin (POST) - Admin', () => {
    const payload = adminData
    return request(app.getHttpServer())
      .post('/register/admin')
      .send(payload)
      .expect(res => {
        if (res.statusCode === 400) {
          expect(res.text).toEqual("{\"message\":\"User may already exist\"}")
        } else {
          expect(res.statusCode).toBe(201)
        }
      })
  });

  it('/login (POST)', () => {
    const payload = LoginData
    return request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(201)
  });

  // ---------------------------- GET /users

  it('/users (GET) - No Auth', async () => {
    return await request(app.getHttpServer()).get('/users').expect(401);
  });

  it('/users (GET) - Customer', async () => {
    const token = await GenerateToken(decoded_customer);
    return await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`).expect(403);
  });

  it('/users (GET) - Employee', async () => {
    const token = await GenerateToken(decoded_employee);
    return await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`).expect(200);
  });

  it('/users (GET) - Admin', async () => {
    const token = await GenerateToken(decoded_admin);
    return await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`).expect(200);
  });

  // ---------------------------- GET /users/:id

  it('/users/:id (GET BY MYSELF ID) - No Auth', async () => {
    const token = await GenerateToken(decoded_customer);
    const id = decoded_random.id;
    return await request(app.getHttpServer()).get(`/users/${id}`).set('Authorization', `Bearer ${token}`).expect(401);
  });

  it('/users/:id (GET BY MYSELF ID) - Customer', async () => {
    const payload = customerData
    return await request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(201)
      .expect(async res => {
        const decoded = jwt.decode(res.text);
        await request(app.getHttpServer())
          .get(`/users/${decoded.id}`)
          .set('Authorization', `Bearer ${res.text}`)
          .expect(200);
      })
  });

  it('/users/:id (GET BY MYSELF ID) - Employee', async () => {
    const payload = employeeData
    return await request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(201)
      .expect(async res => {
        const decoded = jwt.decode(res.text);
        await request(await app.getHttpServer())
          .get(`/users/${decoded.id}`)
          .set('Authorization', `Bearer ${res.text}`)
          .expect(200);
      })
  });

  it('/users/:id (GET BY MYSELF ID) - Admin', async () => {
    const payload = adminData
    return await request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(201)
      .expect(async res => {
        const decoded = jwt.decode(res.text);
        await request(app.getHttpServer())
          .get(`/users/${decoded.id}`)
          .set('Authorization', `Bearer ${res.text}`)
          .expect(200);
      })
  });

  // ---------------------------- DELETE /users/:id

  // DELETE USER CREATED BEFORE TO CLEAN DB

  test(('/users/:id (DELETE BY ID) - Customer'), async () => {
    const adminPayload = adminData
    const customerPayload = customerData

    return await request(app.getHttpServer())
      .post('/login')
      .send(customerPayload)
      .expect(201)
      .expect(async res => {
        const decodedUser = jwt.decode(res.text);
        await request(app.getHttpServer())
          .post('/login')
          .send(adminPayload)
          .expect(201)
          .expect(async res => {
            const adminToken = res.text;
            await request(app.getHttpServer())
              .delete(`/users/${decodedUser.id}`)
              .set('Authorization', `Bearer ${adminToken}`)
              .expect(200)
          });
      })
  })


  test(('/users/:id (DELETE BY ID) -  Employee'), async () => {
    const adminPayload = adminData
    const employeePayload = employeeData

    return await request(app.getHttpServer())
      .post('/login')
      .send(employeePayload)
      .expect(201)
      .expect(async res => {
        const decodedEmployee = jwt.decode(res.text);
        await request(app.getHttpServer())
          .post('/login')
          .send(adminPayload)
          .expect(201)
          .expect(async res => {
            const adminToken = res.text;
            await request(app.getHttpServer())
              .delete(`/users/${decodedEmployee.id}`)
              .set('Authorization', `Bearer ${adminToken}`)
              .expect(200)
          });
      })
  })

});

