import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  password: string;

  @ApiProperty({
    example: 1,
    description: 'The permission ID of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  id_permission: number;
}
