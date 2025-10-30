import { AuthGuard } from '@/auth/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformQueryPipe } from '../common/pipes/transform-query.pipe';
import { CreateProductDto, FindProductsDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query(TransformQueryPipe) query?: FindProductsDto) {
    return await this.productService.getAllProducts(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProductById(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  async create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }
}
