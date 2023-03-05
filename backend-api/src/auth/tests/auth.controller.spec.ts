import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import { LoginController, RegisterController } from '../auth.controller';
import { AuthModule } from '../auth.modules';
import { AuthService } from '../auth.service';

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
  let loginController: LoginController;
  let registerController: RegisterController;

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

    loginController = moduleRef.get<LoginController>(LoginController);
    registerController = moduleRef.get<RegisterController>(RegisterController);

  });


  describe('AuthModule', () => {
    it('module should be defined', async () => {
      expect(AuthModule).toBeDefined();
    });
  });

  describe('loginController', () => {
    it('controller should be defined', () => {
      expect(loginController).toBeDefined();
    });
  });

  describe('registerController', () => {
    it('controller should be defined', () => {
      expect(registerController).toBeDefined();
    });
  });



});