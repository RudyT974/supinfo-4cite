import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import {HttpStatus} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/auth/dto/auth.dto';
import { DecodeToken } from 'src/auth/utils/jwt';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) {}
    
  async create(hotel: CreateHotelDto): Promise<void> {
  if (await this.hotelsRepository.findOneBy({ name: hotel.name}))
    throw new HttpException({ message: 'Hotel may already exist' }, HttpStatus.BAD_REQUEST);
try {
  await this.hotelsRepository.save(this.hotelsRepository.create(hotel))
} catch (error) {
  console.log(error)
  throw new HttpException({ message: 'Error creating hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
}
  }


  async findAll(): Promise<Hotel[]> {
   try{
    return await this.hotelsRepository.find()
   }catch(error){
    throw new HttpException({ message: 'Error finding hotels' }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async getHotelById(id: string): Promise<Hotel> {

    const hotel = await this.hotelsRepository.findOneBy({ id });
    if (!hotel)
    throw new HttpException({ message: 'Hotel not found' }, HttpStatus.BAD_REQUEST);

  try {
    return hotel;
  } catch (error) {
    throw new HttpException({ message: 'Error finding hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async update(id: string, HotelData: UpdateHotelDto, headers: any): Promise<void> {

    const oldHotelData = await this.hotelsRepository.findOneBy({ id });
    if (!oldHotelData) {
      throw new HttpException({ message: 'Hotel not found' }, HttpStatus.NOT_FOUND);
    }
      try {
        delete oldHotelData.description;
        const UpdateHotelDto = Object.assign(oldHotelData, HotelData);
        await this.hotelsRepository.save(UpdateHotelDto);
      } catch (error) {
        throw new HttpException({ message: 'Error updating hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }

  async remove(id: string, headers: any): Promise<void> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.id === id) {
      const hotel = await this.hotelsRepository.findOneBy({ id })
      if (!hotel) {
        throw new HttpException({ message: 'Hotel not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.hotelsRepository.delete(id);
        console.log("hotel suprimer.")
      } catch (error) {
        throw new HttpException({ message: 'Error deleting hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    if (decoded.role === 'admin') {
      const hotel = await this.hotelsRepository.findOneBy({ id })
      if (!hotel) {
        throw new HttpException({ message: 'Hotel not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.hotelsRepository.delete(id);
      } catch (error) {
        throw new HttpException({ message: 'Error deleting hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }
  }
}
