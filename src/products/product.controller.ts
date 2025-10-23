import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, FindProductDto } from './dto';
import { TransformQueryPipe } from '../common/pipes/transform-query.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query(TransformQueryPipe) query?: FindProductDto) {
    return await this.productService.getAllProducts(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProductById(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }
}
