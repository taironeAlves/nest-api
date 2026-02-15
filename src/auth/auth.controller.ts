import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('register')
  async register(@Body() register_dto: RegisterDto) {
    return this.auth_service.register(register_dto);
  }

  @Post('login')
  async login(@Body() login_dto: LoginDto) {
    return this.auth_service.login(login_dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  get_profile(@Request() req: any) {
    return req.user;
  }
}
