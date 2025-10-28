import { AuthGuard } from '@/auth/guards/auth.guards';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

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
}
