import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UtilsService } from '@/common/utils/utils.service';
import { JWT_CONFIG } from '@/config/jwt';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UtilsService],
      imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
