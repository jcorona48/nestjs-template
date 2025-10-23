import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Application } from 'express';

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
}

describe('Product Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer() as Application)
      .get('/products')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/products (POST)', () => {
    const newProduct = {
      name: 'E2E Test Product',
      description: 'This is a product created during e2e testing',
      price: 49.99,
    };
    return request(app.getHttpServer() as Application)
      .post('/products')
      .send(newProduct)
      .expect(201)
      .expect((res) => {
        const body = res.body as ProductResponse;
        expect(body).toHaveProperty('id');
        expect(body).toEqual({ ...newProduct, id: body.id });
      });
  });

  it('/products/:id (GET)', async () => {
    const newProduct = {
      name: 'E2E Test Product 2',
      description: 'This is another product created during e2e testing',
      price: 59.99,
    };
    const postResponse = await request(app.getHttpServer() as Application)
      .post('/products')
      .send(newProduct)
      .expect(201);

    const product = postResponse.body as ProductResponse;

    return request(app.getHttpServer() as Application)
      .get(`/products/${product.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', product.id);
        expect(res.body).toEqual(product);
      });
  });
});
