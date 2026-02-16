import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  id_permission: number;
}
