import { HashingService } from '@/core/common/hashing/hashing.service';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, Exclude, UpdateUserDto } from './dto';
import { User } from './interfaces/users.interface';

const users: User[] = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@example.com',
    password:
      '$argon2id$v=19$m=4096,t=1,p=1$CXpFmapigBeSNxTo58SmEQ$rdDGBn9I+JcmPVk5rvM+a5jWi7htgPp2L1i4FotyjVs',
  },
];

@Injectable()
export class UsersService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Exclude<User, 'password'>[]> {
    const usersPrisma = await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });

    return await Promise.resolve(usersPrisma);
  }

  async findByNameOrEmailWithPassword(
    identifier: string,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ name: identifier }, { email: identifier }],
      },
    });

    return user;
  }

  async findById(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });
    if (!user) return undefined;
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        ...user,
        password: await this.hashingService.hash(user.password),
      },
    });
    return await Promise.resolve(newUser);
  }

  async delete(id: number): Promise<void> {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return await Promise.resolve();
  }

  async update(
    id: number,
    updatedUser: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = users.find((user) => user.id === id);
    if (!user) return await Promise.resolve(undefined);
    Object.assign(user, updatedUser);
    return await Promise.resolve(user);
  }
}
