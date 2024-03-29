import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import { BookingController } from '../booking.controller';
import { Booking } from '../booking.module';
import { BookingsService } from '../booking.service';

let jwt = require('jsonwebtoken');

async function GenerateToken(params) {
  return await jwt.sign({
    id: params.id,
    role: params.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, "JWT_SECRET");
}

describe('BookingsService', () => {
  let bookingsService: BookingsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [Booking, User],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Booking])],
      controllers: [BookingController],
      providers: [BookingsService],
    }).compile();

    bookingsService = moduleRef.get<BookingsService>(BookingsService);
  });

  describe('BookingsService', () => {
    it('service should be defined', () => {
      expect(bookingsService).toBeDefined();
    });
  });


});