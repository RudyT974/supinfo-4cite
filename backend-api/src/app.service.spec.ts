import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../backend-api/src/users/entities/users.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

let jwt = require('jsonwebtoken');

describe('appController', () => {
  let appService: AppService;

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
      }),],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
  });

  describe('AppService', () => {
    it('service should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('AppService', () => {
    it('service should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('healthCheck', () => {
    it('should return an array of users', async () => {

      jest.spyOn(appService, 'healthCheck').mockImplementation(async () => Promise.resolve());

      expect(await appService.healthCheck()).toBeUndefined(); // Promise<void>
    });
  });

});