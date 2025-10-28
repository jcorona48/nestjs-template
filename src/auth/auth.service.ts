import { HashingService } from '@/common/hashing/hashing.service';
import { User } from '@/users/interfaces/users.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export type AuthInput = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(input: AuthInput): Promise<User | null> {
    const user = await this.usersService.findByNameOrEmailWithPassword(
      input.username,
    );

    if (!user) return null;

    const matchPassword = await this.hashingService.verify(
      user?.password,
      input.password,
    );

    return user && matchPassword ? user : null;
  }

  async authenticate(input: AuthInput): Promise<{
    user: User;
    token: string;
  }> {
    const user = await this.validateUser(input);
    if (!user) throw new UnauthorizedException();

    return this.signIn(user);
  }

  async signIn(user: User): Promise<{ token: string; user: User }> {
    const payload = { username: user.name, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      token: accessToken,
      user,
    };
  }
}
