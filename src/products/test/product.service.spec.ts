import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { UtilsService } from '../../common/utils/utils.service';
import { Product } from '../interface/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, UtilsService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const productToinsert = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 99.99,
  };

  it('should insert a product', async () => {
    const result: Partial<Product> =
      await service.createProduct(productToinsert);
    expect(result).toHaveProperty('id');
    if (result.id) delete result.id;
    expect(result).toEqual(productToinsert);
  });

  it('should retrieve all products', async () => {
    const result = await service.getAllProducts();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should retrieve a product by id', async () => {
    const newProduct = await service.createProduct(productToinsert);
    const result = await service.getProductById(newProduct.id);
    expect(result).toBeDefined();
    if (!result) return expect(typeof result).toBe('object');
    expect(result).toEqual(newProduct);
  });

  it('should update a product', async () => {
    const newProduct = await service.createProduct(productToinsert);
    const updatedData = {
      name: 'Updated Product',
      description: 'This is an updated test product',
      price: 79.99,
    };
    const result = await service.updateProduct(newProduct.id, updatedData);
    expect(result).toBeDefined();
    if (!result) return expect(typeof result).toBe('object');
    expect(result).toEqual({ ...newProduct, ...updatedData });
  });
});
