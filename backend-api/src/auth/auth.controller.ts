import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { Roles } from "./guards/auth.decorator";
import { Role } from "./guards/auth.enum";

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginData: LoginUserDto): Promise<Token> {
    return this.authService.login(loginData);
  }

}


@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createUser(userData);
  }

  @Post('employee')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEmployee(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createEmployee(userData);
  }

  @Post('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAdmin(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createAdmin(userData);
  }
}


