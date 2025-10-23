import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UtilsService } from '@/common/utils/utils.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UtilsService],
      imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const result = await controller.createUser(dto);
    expect(result).toHaveProperty('id');
    expect(result).toEqual({ id: result.id, ...dto });
  });

  it('should get all users without password', async () => {
    const users = await controller.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    users.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).not.toHaveProperty('password');
    });
  });

  it('should get user by id without password', async () => {
    const dto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password456',
    };
    const createdUser = await controller.createUser(dto);
    const user = await controller.getUserById(createdUser.id);
    expect(user).toHaveProperty('id', createdUser.id);
    expect(user).toHaveProperty('name', dto.name);
    expect(user).toHaveProperty('email', dto.email);
    expect(user).not.toHaveProperty('password');
  });
});
