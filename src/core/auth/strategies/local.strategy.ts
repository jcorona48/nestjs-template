import { AuthService } from '@/core/auth/auth.service';
import { User } from '@/core/users/interfaces/users.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password', // sensitive
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      password: password,
      username: email,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
