import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, SetMetadata, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, UserIdParams } from "./dto/users.dto";
import { Role } from "../auth/roles.enum";
import { Roles } from "../auth/roles.decorator";
import { User } from "./entities/users.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findById(@Param() { id }: UserIdParams): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() { id }: UserIdParams): Promise<void> {
    await this.userService.remove(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param() { id }: UserIdParams, @Body() userData: UpdateUserDto) {
    return this.userService.update(id, userData);
  }

}

