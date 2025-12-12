import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UtilsService } from '@/core/common/utils/utils.service';
import { JWT_CONFIG } from '@/core/config/jwt';
import { PrismaService } from '@/core/prisma/prisma.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UtilsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
      imports: [
        JwtModule.register(JWT_CONFIG as JwtModuleOptions),
        HashingModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123', // sensitive
    };
    prismaService.user.create = jest.fn().mockResolvedValue({
      id: 1,
      name: dto.name,
      email: dto.email,
      // password would not be returned in a real scenario
    });
    const result = await controller.createUser(dto);
    expect(result).toHaveProperty('id');
    expect(result).toEqual({
      id: 1,
      name: dto.name,
      email: dto.email,
    });
  });

  it('should get all users without password', async () => {
    prismaService.user.findMany = jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
    ]);
    const users = await controller.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    for (const user of users) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).not.toHaveProperty('password');
    }
  });

  it('should get user by id without password', async () => {
    const dto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password456', // sensitive
    };
    prismaService.user.create = jest.fn().mockResolvedValue({
      id: 2,
      name: dto.name,
      email: dto.email,
    });
    prismaService.user.findUnique = jest.fn().mockResolvedValue({
      id: 2,
      name: dto.name,
      email: dto.email,
    });
    const createdUser = await controller.createUser(dto);
    const user = await controller.getUserById(createdUser.id);
    expect(user).toHaveProperty('id', createdUser.id);
    expect(user).toHaveProperty('name', dto.name);
    expect(user).toHaveProperty('email', dto.email);
    expect(user).not.toHaveProperty('password');
  });
});
