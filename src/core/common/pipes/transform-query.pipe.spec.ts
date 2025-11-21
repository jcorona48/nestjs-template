import { TransformQueryPipe } from './transform-query.pipe';
import { ArgumentMetadata } from '@nestjs/common';

describe('TransformQueryPipe', () => {
  let pipe: TransformQueryPipe;

  beforeEach(() => {
    pipe = new TransformQueryPipe();
  });

  const metadata: ArgumentMetadata = {
    type: 'query',
    metatype: Object,
    data: '',
  };

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform complex query objects', () => {
    const query = {
      'price[gt]': '10',
      'price[lt]': '100',
      name: 'Test Product',
      inStock: '0',
      id: '123',
      'items[0][id]': '1',
      'items[0][name]': 'Item 1',
      'items[0][price]': '50',
      active: 'true',
      isEdited: 'false',
    };

    const result = pipe.transform(query, metadata);
    expect(result).toEqual({
      price: { gt: 10, lt: 100 },
      name: 'Test Product',
      inStock: 0,
      active: true,
      isEdited: false,
      id: 123,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 50,
        },
      ],
    });
  });

  it('should return the same value for non-query metadata', () => {
    const nonQueryMetadata: ArgumentMetadata = {
      type: 'body',
      metatype: Object,
      data: '',
    };
    const value = { some: 'data' };
    const result = pipe.transform(value, nonQueryMetadata);
    expect(result).toBe(value);
  });
});
