import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request & { user?: any } = context
        .switchToHttp()
        .getRequest();
      const authorization = request.headers['authorization'] as string;
      const token = authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload: {
        username: string;
        sub: string;
      } = await this.jwtService.verifyAsync(token);
      request.user = {
        id: payload.sub,
        name: payload.username,
      };
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }
}
