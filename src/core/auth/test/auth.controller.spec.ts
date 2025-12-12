import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UtilsService } from '@/core/common/utils/utils.service';
import { HashingConfig } from '@/core/config/hashing';
import { JWT_CONFIG } from '@/core/config/jwt';
import { PrismaService } from '@/core/prisma/prisma.service';
import { UsersModule } from '@/core/users/users.module';
import { UsersService } from '@/core/users/users.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        UtilsService,
        PrismaService,
        LocalStrategy,
        JwtStrategy,
        HashingConfig,
      ],
      imports: [
        JwtModule.register(JWT_CONFIG as JwtModuleOptions),
        PassportModule,
        HashingModule,
        UsersModule,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
