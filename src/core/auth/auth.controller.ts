import { AuthGuard } from '@/core/auth/guards/auth.guard';
import { User } from '@/core/users/interfaces/users.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/passport.guard';

@ApiTags('Authorization')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('authorization')
  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: ExpressRequest & { user?: any }): any {
    return req.user;
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ token: string }> {
    const validationResult = await this.authService.authenticate({
      username: loginDto.email,
      password: loginDto.password,
    });

    if (!validationResult) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return validationResult;
  }

  @ApiBearerAuth('authorization')
  @Version('2')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfileV2(@Request() req: ExpressRequest & { user?: any }): any {
    return req.user;
  }

  @Version('2')
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async loginV2(
    @Request() req: ExpressRequest & { user: User },
  ): Promise<{ token: string }> {
    return this.authService.signIn(req.user);
  }
}
