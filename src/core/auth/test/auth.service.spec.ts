import { JWT_CONFIG } from '@/config/jwt';
import { JwtStrategy } from '@/core/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/core/auth/strategies/local.strategy';
import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UsersModule } from '@/core/users/users.module';
import { PrismaService } from '@/prisma.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
      imports: [
        UsersModule,
        JwtModule.register(JWT_CONFIG as JwtModuleOptions),
        HashingModule,
        PassportModule,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
