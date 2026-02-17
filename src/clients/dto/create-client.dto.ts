import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Empresa XYZ Ltda', description: 'The legal name of the client' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  razao_social: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the client' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: '123 Main St', description: 'The address of the client' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

  @ApiProperty({ example: 'password123', description: 'The password of the client' })
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  password: string;

  @ApiProperty({ example: '12.345.678/0001-90', description: 'The CNPJ of the client' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  cnpj: string;
}
