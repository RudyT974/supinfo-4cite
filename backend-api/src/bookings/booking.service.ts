import { Token } from 'src/auth/dto/auth.dto';
import { Booking } from './entities/booking.entity';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Repository } from 'typeorm';
import { DecodeToken } from 'src/auth/utils/jwt';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>
    ){}

  async create(booking: CreateBookingDto, headers: any, hotelId:string): Promise<void>{

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);
    const bookings = await this.bookingsRepository.findOneBy({idHotel: hotelId, idClient: decoded.id});
   
    
      if (await this.bookingsRepository.findOneBy({}))
      throw new HttpException({ message: 'Booking may already exist' }, HttpStatus.BAD_REQUEST);
  try {
    await this.bookingsRepository.save(this.bookingsRepository.create(booking))
  } catch (error) {
    console.log(error)
    throw new HttpException({ message: 'Error creating booking' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  }
  async findAll(headers: any): Promise<Booking[]> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if(decoded.role === 'admin'){
      return await this.bookingsRepository.find();
    }else{
      throw new HttpException({ message: 'Error finding bookings' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
   }

   async getBookingById(id: string, arrivalDate: Date, departureDate: Date): Promise<Booking> {

    const booking = await this.bookingsRepository.findOneBy({ id, arrivalDate, departureDate });
    if (!booking)
    throw new HttpException({ message: 'Booking not found' }, HttpStatus.BAD_REQUEST);

  try {
    return booking;
  } catch (error) {
    throw new HttpException({ message: 'Error finding booking' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async update(id: string, BookingData: UpdateBookingDto, headers: any): Promise<void> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);
    const oldBookingData = await this.bookingsRepository.findOneBy({ id });


    if(decoded.role === 'admin'){
      try {
        delete oldBookingData.arrivalDate;
        delete oldBookingData.departureDate;
        const UpdateBookingDto = Object.assign(oldBookingData, BookingData);
        await this.bookingsRepository.save(UpdateBookingDto);
      } catch (error) {
        throw new HttpException({ message: 'Error updating booking' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    if (!oldBookingData) {
      throw new HttpException({ message: 'Booking not found' }, HttpStatus.NOT_FOUND);
    }
      

  }

  async remove(id: string, headers: any): Promise<void> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.id === id) {
      const hotel = await this.bookingsRepository.findOneBy({ id })
      if (!hotel) {
        throw new HttpException({ message: 'Booking not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.bookingsRepository.delete(id);
        console.log("hotel suprimer.")
      } catch (error) {
        throw new HttpException({ message: 'Error deleting booking' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    if (decoded.role === 'admin') {
      const booking = await this.bookingsRepository.findOneBy({ id })
      if (!booking) {
        throw new HttpException({ message: 'Booking not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.bookingsRepository.delete(id);
      } catch (error) {
        throw new HttpException({ message: 'Error deleting booking' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }
  }
}
