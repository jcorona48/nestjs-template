import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, FindProductDto } from './dto';
import type { Product } from './interface/product.interface';
import { UtilsService } from '../common/utils/utils.service';

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'Description for Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    description: 'Description for Product 2',
  },
];

@Injectable()
export class ProductService {
  constructor(private readonly utilsService: UtilsService) {}

  async getAllProducts(query?: FindProductDto) {
    const filteredProducts = this.utilsService.filterByQuery(products, query);
    return new Promise<Product[]>((resolve) => {
      resolve(filteredProducts);
    });
  }

  async getProductById(id: number) {
    return new Promise<Product | undefined>((resolve) => {
      const product = products.find((product) => product.id === id);
      resolve(product);
    });
  }

  async createProduct(newProductDto: CreateProductDto) {
    const newProduct = {
      id: products.length + 1,
      ...newProductDto,
    };
    products.push(newProduct);
    return new Promise<Product>((resolve) => {
      resolve(newProduct);
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);
    if (product) {
      Object.assign(product, updateProductDto);
    }
    return product;
  }
}
