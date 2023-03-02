import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import {HttpStatus} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HotelsService {
  
  async create(createHotelDto: CreateHotelDto) {
    const hotel = await this.hotelsRepository.findOne({select: ['id', 'name', 'location'] });

    if (await this.hotelsRepository.findOneBy({ name: hotel.name }))
    throw new HttpException({ message: 'Hotel may already exist' }, HttpStatus.BAD_REQUEST);

  try {
    await this.hotelsRepository.save(this.hotelsRepository.create(hotel))
  } catch (error) {
    console.log(error)
    throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) { }

  async findAll(): Promise<Hotel[]> {
   try{
    return await this.hotelsRepository.find()
   }catch(error){
    throw new HttpException({ message: 'Error finding hotels' }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async findById(id: string): Promise<Hotel> {

    const hotel = await this.hotelsRepository.findOneBy({ id });
    if (!hotel)
    throw new HttpException({ message: 'Hotel not found' }, HttpStatus.BAD_REQUEST);

  try {
    return hotel;
  } catch (error) {
    throw new HttpException({ message: 'Error finding hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    const oldHotelData = await this.hotelsRepository.findOneBy({ id });

    if (!oldHotelData)
      throw new HttpException({ message: 'Hotel not found' }, HttpStatus.BAD_REQUEST);

    const updatedUserData = Object.assign(oldHotelData, updateHotelDto);

    try {
      await this.hotelsRepository.save(updatedUserData);
    } catch (error) {
      throw new HttpException({ message: 'Error updating hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const user = await this.hotelsRepository.findOneBy({ id });

    if (!user)
      throw new HttpException({ message: 'Hotel not found' }, HttpStatus.BAD_REQUEST);

    try {
      await this.hotelsRepository.delete(id);
    } catch (error) {
      throw new HttpException({ message: 'Error deleting hotel' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
