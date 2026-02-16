import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './auth.public.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('register')
  @ApiBearerAuth('access-token')
  async register(@Body() register_dto: RegisterDto) {
    return this.auth_service.register(register_dto);
  }

  @Public()
  @Post('login')
  async login(@Body() login_dto: LoginDto) {
    return this.auth_service.login(login_dto);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  get_profile(@Request() req) {
    return req.user;
  }
}
