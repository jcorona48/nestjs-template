import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('filterByQuery', () => {
  let service: UtilsService;

  beforeEach(() => {
    service = new UtilsService();
  });

  it('should return all items if no query is provided', () => {
    const items = [{ id: 1 }, { id: 2 }];
    expect(service.filterByQuery(items)).toEqual(items);
  });

  it('should filter items based on query object', () => {
    const items = [
      { id: 1, name: 'Item 1', price: 100 },
      { id: 2, name: 'Item 2', price: 200 },
    ];
    let query: { price?: { min?: number; max?: number } } = {
      price: { min: 150 },
    };
    expect(service.filterByQuery(items, query)).toEqual([
      { id: 2, name: 'Item 2', price: 200 },
    ]);

    query = { price: { max: 150 } };
    expect(service.filterByQuery(items, query)).toEqual([
      { id: 1, name: 'Item 1', price: 100 },
    ]);

    query = { price: { min: 100, max: 200 } };
    expect(service.filterByQuery(items, query)).toEqual(items);
  });

  it('should filter items based on string inclusion', () => {
    const items = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
    ];
    const query = { name: 'app' };
    expect(service.filterByQuery(items, query)).toEqual([
      { id: 1, name: 'Apple' },
    ]);
  });

  it('should filter items based on array inclusion', () => {
    const items = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'C' },
    ];
    const query = { category: ['A', 'C'] };
    expect(service.filterByQuery(items, query)).toEqual([
      { id: 1, category: 'A' },
      { id: 3, category: 'C' },
    ]);
  });
});
