import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@/users/interfaces/users.interface';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '@/common/hashing/hashing.service';

export type AuthInput = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashingService: HashingService,
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
