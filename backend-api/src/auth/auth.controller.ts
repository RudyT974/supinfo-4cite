import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/auth.dto";
import { Roles } from "./guards/auth.decorator";
import { Role } from "./guards/auth.enum";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @Roles(Role.GUEST)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

}