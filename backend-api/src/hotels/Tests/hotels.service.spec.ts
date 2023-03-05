import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsController } from '../hotels.controller';
import { Hotel } from '../hotels.module';
import { HotelsService } from '../hotels.service';

let jwt = require('jsonwebtoken');


describe('hotelsController', () => {
  let hotelsService: HotelsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [Hotel],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Hotel])],
      controllers: [HotelsController],
      providers: [HotelsService],
    }).compile();

    hotelsService = moduleRef.get<HotelsService>(HotelsService);

  });


  describe('hotelsService', () => {
    it('service should be defined', async () => {
      expect(hotelsService).toBeDefined();
    });
  });

});