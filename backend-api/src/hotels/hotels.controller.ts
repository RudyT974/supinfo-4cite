import { Controller,Headers, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, Put, UseInterceptors, UploadedFile, ParseFilePipe, UploadedFiles, UseGuards, Req, Patch } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto'; 
import { Role } from "../auth/guards/auth.enum";
import { Roles } from "../auth/guards/auth.decorator";
import { Hotel } from './entities/hotel.entity';
import { HotelIdParams } from './dto/HotelIdParams';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly hotelsService: HotelsService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() hotel: CreateHotelDto) {
    return this.hotelsService.create(hotel);
  }
 
  @Get()
  async findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelsService.getHotelById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param() { id }: HotelIdParams, @Body() hotelData: UpdateHotelDto, @Headers() headers: any): Promise<void> {
    return this.hotelsService.update(id, hotelData, headers);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() { id }: HotelIdParams, @Headers() headers: any): Promise<void> {
    await this.hotelsService.remove(id, headers);
  }
}


