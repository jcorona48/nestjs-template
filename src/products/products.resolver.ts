import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Args, Int } from '@nestjs/graphql';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], {
    name: 'products',
  })
  async getProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Query(() => Product, { nullable: true, name: 'product' })
  async getProductById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product | undefined> {
    return await this.productService.getProductById(id);
  }
}
