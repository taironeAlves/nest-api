import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of image URLs',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
