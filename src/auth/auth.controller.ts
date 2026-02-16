import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './auth.public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('register')
  async register(@Body() register_dto: RegisterDto) {
    return this.auth_service.register(register_dto);
  }

  @Public()
  @Post('login')
  async login(@Body() login_dto: LoginDto) {
    return this.auth_service.login(login_dto);
  }

  @Get('profile')
  get_profile(@Request() req) {
    return req.user;
  }
}
