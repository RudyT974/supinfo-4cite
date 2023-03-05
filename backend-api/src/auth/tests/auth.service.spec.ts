import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import { LoginController, RegisterController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { Token, TokenStructure } from '../dto/auth.dto';
import { decoded_random } from './data.mock';

let jwt = require('jsonwebtoken');

async function GenerateToken(params) {
  return await jwt.sign({
    id: params.id,
    role: params.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, "JWT_SECRET");
}

describe('AuthController', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [User],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([User])],
      controllers: [LoginController, RegisterController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);

  });

  describe('authService', () => {
    it('service should be defined', () => {
      expect(authService).toBeDefined();
    });
  });


  describe('JWT - Generate', () => {
    it('should return a token', async () => {
      const token = await GenerateToken({ id: decoded_random.id, role: decoded_random.role });
      expect(await token).toHaveLength(207);
    });
  });

  describe('JWT - Verify', () => {
    it('should return a token', async () => {
      const params: TokenStructure = { id: decoded_random.id, role: decoded_random.role };
      const token: Token = await GenerateToken(params);
      expect(token).toHaveLength(207);
      const isOk = await jwt.verify(token, "JWT_SECRET");
      expect(isOk).toBeTruthy();
    });
  });

  describe('JWT - Verify', () => {
    it('should return a token', async () => {
      const token = await GenerateToken({ id: decoded_random.id, role: decoded_random.role });
      expect(await token).toHaveLength(207);
      const isOk = await jwt.verify(token, "JWT_SECRET");
      expect(isOk).toBeTruthy();
      const decoded = await jwt.decode(token);
      expect(decoded.id).toEqual(decoded_random.id);
      expect(decoded.role).toEqual(decoded_random.role);
    });
  });


});