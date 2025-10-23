import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '@/users/users.service';
import { UtilsService } from '@/common/utils/utils.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, UtilsService],
      imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
