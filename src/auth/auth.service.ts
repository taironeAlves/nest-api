import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ClientsService } from '../clients/clients.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      id_permission: registerDto.id_permission,
    });

    const access_token = await this.generateToken({
      id: user.id_user,
      email: user.email,
      id_permission: user.id_permission,
      type: 'user',
    });

    return {
      access_token,
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
        id_permission: user.id_permission,
        type: 'user',
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email, true);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials. Error OP501');
      }

      const access_token = await this.generateToken({
        id: user.id_user,
        email: user.email,
        id_permission: user.id_permission,
        type: 'user',
      });

      return {
        access_token,
        user: {
          id: user.id_user,
          name: user.name,
          email: user.email,
          id_permission: user.id_permission,
          type: 'user',
        },
      };
    }

    const client = await this.clientsService.findByEmail(loginDto.email, true);

    if (!client) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      client.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials. Error OP501');
    }

    const access_token = await this.generateToken({
      id: client.id_client,
      email: client.email,
      id_permission: 0,
      type: 'client',
    });

    return {
      access_token,
      user: {
        id: client.id_client,
        name: client.razao_social,
        email: client.email,
        id_permission: 0,
        type: 'client',
      },
    };
  }

  async generateToken(data: {
    id: number;
    email: string;
    id_permission: number;
    type: 'user' | 'client';
  }): Promise<string> {
    const payload = {
      sub: data.id,
      email: data.email,
      id_permission: data.id_permission,
      type: data.type,
    };

    return await this.jwtService.signAsync(payload);
  }
}
