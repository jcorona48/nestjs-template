import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: any } = context
      .switchToHttp()
      .getRequest();
    const authorization = request.headers['authorization'] as string;
    const token = authorization && authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    try {
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
      void e;
      throw new UnauthorizedException();
    }
  }
}
