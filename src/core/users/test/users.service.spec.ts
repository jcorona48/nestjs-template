import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UtilsService } from '@/core/common/utils/utils.service';
import { JWT_CONFIG } from '@/core/config/jwt';
import { PrismaService } from '@/core/prisma/prisma.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, UtilsService],
      imports: [
        JwtModule.register(JWT_CONFIG as JwtModuleOptions),
        HashingModule,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
