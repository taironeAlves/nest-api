import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth('access-token')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiParam({ name: 'createProductDto', type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the product' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the product' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
