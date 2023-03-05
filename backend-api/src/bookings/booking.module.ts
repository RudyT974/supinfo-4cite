import { Module } from '@nestjs/common';
import { BookingsService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Booking from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), ],
  controllers: [BookingController],
  providers: [BookingsService],
  exports: [BookingsService]
  
  
})
export class BookingsModule {}
export { Booking };
