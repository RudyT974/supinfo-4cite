import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Role } from "../auth/guards/auth.enum";
import { Roles } from "../auth/guards/auth.decorator";
import { Hotel } from './entities/hotel.entity';
import { removeHotel } from './dto/delete-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @Roles(Role.ADMIN)
  // @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() hotel: CreateHotelDto) {
    return this.hotelsService.create(hotel);
  }

  @Get()
  async findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelsService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto,Headers);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string) {
    return this.hotelsService.remove(id,Headers);
  }
}
