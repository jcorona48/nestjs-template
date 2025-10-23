import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, FindAllUserDto, Exclude } from './dto';
import { User } from './interfaces/users.interface';
import { UtilsService } from '@/common/utils/utils.service';

const users: User[] = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
  },
];

@Injectable()
export class UsersService {
  constructor(private readonly utilsService: UtilsService) {}

  async findAll(
    query?: FindAllUserDto,
    options?: { withPassword: boolean },
  ): Promise<Exclude<User, 'password'>[]> {
    const usersFiltered = this.utilsService.filterByQuery<
      Omit<User, 'password'>
    >(
      options?.withPassword
        ? users
        : users.map(({ password, ...rest }) => {
            void password;
            return rest;
          }),
      query,
    );
    return await Promise.resolve(usersFiltered);
  }

  async findByEmail(
    email: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await Promise.resolve(
      users.find((user) => user.email === email),
    );
    if (!user) return undefined;
    const { password, ...rest } = user;
    void password;
    return rest;
  }

  async findByEmailWithPassword(email: string): Promise<User | undefined> {
    const user = await Promise.resolve(
      users.find((user) => user.email === email),
    );
    return user;
  }

  async findByNameWithPassword(name: string): Promise<User | undefined> {
    const user = await Promise.resolve(
      users.find((user) => user.name === name),
    );
    return user;
  }

  async findByNameOrEmailWithPassword(
    identifier: string,
  ): Promise<User | undefined> {
    const user = await Promise.resolve(
      users.find(
        (user) => user.name === identifier || user.email === identifier,
      ),
    );
    return user;
  }

  async findById(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await Promise.resolve(users.find((user) => user.id === id));
    if (!user) return undefined;
    const { password, ...rest } = user;
    void password;
    return rest;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
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
