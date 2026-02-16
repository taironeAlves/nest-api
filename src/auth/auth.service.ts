import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      id_permission: registerDto.id_permission,
    });

    const access_token = await this.generateToken(user);

    return {
      access_token,
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
        id_permission: user.id_permission,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email, true); // Sem true Gera Execption Geral.

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials. Error OP501');
    }

    const access_token = await this.generateToken(user);

    return {
      access_token,
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
        id_permission: user.id_permission,
      },
    };
  }

  async generateToken(user: Pick<User, 'id_user' | 'email' | 'id_permission'>): Promise<string> {
    const payload = {
      sub: user.id_user,
      email: user.email,
      id_permission: user.id_permission,
    };

    return await this.jwtService.signAsync(payload);
  }
}
