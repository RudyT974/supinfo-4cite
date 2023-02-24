import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UpdateUserDto } from "./dto/crud.dto";
import { Role } from "../auth/guards/auth.enum";
import { Roles } from "../auth/guards/auth.decorator";
import { User } from "./entities/users.entity";
import { UsersService } from "./users.service";
import { UserIdParams } from "./dto/query.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findById(@Param() { id }: UserIdParams): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() { id }: UserIdParams): Promise<void> {
    await this.userService.remove(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param() { id }: UserIdParams, @Body() userData: UpdateUserDto) {
    return this.userService.update(id, userData);
  }

}

