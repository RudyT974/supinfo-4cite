import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { Headers, UsePipes } from '@nestjs/common/decorators';
import { Roles } from '../auth/guards/auth.decorator';
import { Role } from '../auth/guards/auth.enum';
import { BookingsService } from './booking.service';
import { BookingIdParams } from './dto/BookingIdParams';
import { UpdateBookingDto } from './dto/update-booking.dto';
import Booking from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingsService) { }

  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() booking: CreateBookingDto, @Headers() headers: any, @Param('id') hotelId: string): Promise<any> {
    return this.bookingService.create(booking, headers, hotelId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Headers() headers: any): Promise<Booking[]> {
    return this.bookingService.findAll(headers);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string, @Param('arrivalDate') arrivalDate: Date, departureDate: Date) {
    return this.bookingService.getBookingById(id, arrivalDate, departureDate);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Headers() headers: any) {
    return this.bookingService.update(id, updateBookingDto, headers);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() { id }: BookingIdParams, @Headers() headers: any): Promise<void> {
    await this.bookingService.remove(id, headers);
  }
}