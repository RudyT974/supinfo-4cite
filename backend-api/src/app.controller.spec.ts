import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../backend-api/src/users/entities/users.entity';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';

let jwt = require('jsonwebtoken');

describe('appController', () => {
  let appController: AppController;

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

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('AppModule', () => {
    it('service should be defined', () => {
      expect(AppModule).toBeDefined();
    });
  });

  describe('AppController', () => {
    it('service should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

});