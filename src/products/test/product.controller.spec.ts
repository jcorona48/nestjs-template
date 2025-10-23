import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { UtilsService } from '../../common/utils/utils.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, UtilsService],
      imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const productToinsert = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 99.99,
  };

  it('should insert a product', async () => {
    const result = await controller.create(productToinsert);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(productToinsert.name);
    expect(result.description).toBe(productToinsert.description);
    expect(result.price).toBe(productToinsert.price);
  });

  it('should retrieve all products', async () => {
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should retrieve a product by id', async () => {
    const newProduct = await controller.create(productToinsert);
    const result = await controller.findOne(newProduct.id);
    expect(result).toBeDefined();
    if (!result) return expect(typeof result).toBe('object');
    expect(result).toHaveProperty('id', newProduct.id);
    expect(result.name).toBe(newProduct.name);
    expect(result.description).toBe(newProduct.description);
    expect(result.price).toBe(newProduct.price);
  });

  it('should update a product', async () => {
    const newProduct = await controller.create(productToinsert);
    const updatedData = {
      name: 'Updated Product',
      description: 'This is an updated test product',
      price: 79.99,
    };
    const result = await controller.update(newProduct.id, updatedData);
    expect(result).toBeDefined();
    if (!result) return expect(typeof result).toBe('object');
    expect(result).toHaveProperty('id', newProduct.id);
    expect(result.name).toBe(updatedData.name);
    expect(result.description).toBe(updatedData.description);
    expect(result.price).toBe(updatedData.price);
  });
});
