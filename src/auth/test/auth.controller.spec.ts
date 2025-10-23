import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UtilsService } from '@/common/utils/utils.service';
import { UsersService } from '@/users/users.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, UtilsService],
      imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
