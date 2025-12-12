import { AuthService as BankinglyAuthService } from '@/bankingly/auth/auth.service';
import { HashingService } from '@/core/common/hashing/hashing.service';
import { User } from '@/core/users/interfaces/users.interface';
import { UsersService } from '@/core/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
    private readonly bankinglyAuthService: BankinglyAuthService,
  ) {}

  async validateUser(
    input: AuthInput,
    userBankingly?: User,
  ): Promise<User | null> {
    const user =
      userBankingly ||
      (await this.usersService.findByNameOrEmailWithPassword(input.username));

    if (!user) return null;

    const matchPassword = await this.hashingService.verify(
      user?.password,
      input.password,
    );

    return user && matchPassword ? user : null;
  }

  async validateBankinglyUser(input: AuthInput) {
    const bankinglyResponse = await this.bankinglyAuthService.login({
      userName: input.username,
      password: input.password,
    });

    if (!bankinglyResponse || !bankinglyResponse.userAccessToken) return null;

    const userByInput = await this.usersService.createOrUpdateFromBankingly({
      email: input.username,
      password: input.password,
    });
    return { ...bankinglyResponse, user: userByInput };
  }

  async authenticate(input: AuthInput): Promise<{
    user: User;
    token: string;
    bankingly: any;
  }> {
    const bankinglyUser = await this.validateBankinglyUser(input);
    if (!bankinglyUser) throw new UnauthorizedException();

    const user = await this.validateUser(input, bankinglyUser.user);
    if (!user) throw new UnauthorizedException();

    return {
      ...(await this.signIn(user)),
      bankingly: bankinglyUser,
    };
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
