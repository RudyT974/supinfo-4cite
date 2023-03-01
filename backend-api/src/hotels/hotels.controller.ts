import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Role } from "../auth/guards/auth.enum";
import { Roles } from "../auth/guards/auth.decorator";

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  async remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
