import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import {HttpStatus} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  create(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }

  async findAll() {
   try{
    return await this.findAll()
   }catch(error){
    throw new HttpException({ message: 'Error finding hotels' }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async findById(id: String) {

    // const hotel = await this.hotel.
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
