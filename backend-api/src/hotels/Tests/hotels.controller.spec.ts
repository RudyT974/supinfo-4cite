import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsController } from '../hotels.controller';
import { Hotel, HotelsModule } from '../hotels.module';
import { HotelsService } from '../hotels.service';
let jwt = require('jsonwebtoken');


describe('hotelsController', () => {
  let hotelsController: HotelsController;

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

    hotelsController = moduleRef.get<HotelsController>(HotelsController);

  });


  describe('HotelModule', () => {
    it('module should be defined', async () => {
      expect(HotelsModule).toBeDefined();
    });
  });

  describe('hotelController', () => {
    it('controller should be defined', () => {
      expect(hotelsController).toBeDefined();
    });
  });

});