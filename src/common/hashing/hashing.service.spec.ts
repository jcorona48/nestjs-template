import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash and verify a value correctly', async () => {
    const value = 'test-value';
    const hash = await service.hash(value);
    const isMatch = await service.verify(value, hash);
    expect(isMatch).toBe(true);
  });
});
