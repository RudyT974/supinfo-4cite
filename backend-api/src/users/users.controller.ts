import { Body, Headers, Controller, Delete, Get, Param, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
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
  async findAllUser(@Headers() headers: any): Promise<User[]> {
    return this.userService.findAll(headers);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findById(@Param() { id }: UserIdParams, @Headers() headers: any): Promise<User> {
    return this.userService.findById(id, headers);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() { id }: UserIdParams, @Headers() headers: any): Promise<void> {
    await this.userService.remove(id, headers);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param() { id }: UserIdParams, @Body() userData: UpdateUserDto, @Headers() headers: any): Promise<void> {
    return this.userService.update(id, userData, headers);
  }

}



