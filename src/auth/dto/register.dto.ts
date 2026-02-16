import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  password: string;

  @ApiProperty({ description: 'The permission ID of the user' })
  @IsNumber()
  @IsNotEmpty()
  id_permission: number;
}
