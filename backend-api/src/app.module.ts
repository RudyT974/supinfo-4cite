import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'
import { AuthModule } from './auth/auth.modules';
import { User } from './users/entities/users.entity';
import { Hotel } from './hotels/entities/hotel.entity';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/booking.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Booking } from './bookings/entities/booking.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Hotel, Booking],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HotelsModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
