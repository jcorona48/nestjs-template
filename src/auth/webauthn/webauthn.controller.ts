import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from 'node_modules/@simplewebauthn/server/esm/types';
import { WebauthnService } from './webauthn.service';
import { User } from '@/users/interfaces/users.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

@Controller({
  path: 'auth/webauthn',
  version: '1',
})
export class WebauthnController {
  constructor(private readonly webauthnService: WebauthnService) {}

  @Post('register/start')
  async registerStart(@Body() body: { userId: number; userName: string }) {
    return this.webauthnService.generateRegistrationOptions(
      body.userId,
      body.userName,
    );
  }

  @Post('register/verify')
  async registerVerify(
    @Body() body: { userId: number; response: RegistrationResponseJSON },
  ) {
    return this.webauthnService.verifyRegistration(body.userId, body.response);
  }

  @Post('authenticate/start')
  async authenticateStart(@Body() body?: { identifier?: number | string }) {
    return this.webauthnService.generateAuthenticationOptions(body?.identifier);
  }

  @Post('authenticate/verify')
  async authenticateVerify(
    @Body()
    body: {
      response: AuthenticationResponseJSON;
    },
  ) {
    const credentialID = body?.response?.id;
    return this.webauthnService.verifyAuthentication(
      credentialID,
      body.response,
    );
  }

  @ApiBearerAuth('authorization')
  @Get('methods/available')
  @UseGuards(JwtAuthGuard)
  async availableAuthMethods(
    @Request() req: ExpressRequest & { user: User },
  ): Promise<string[]> {
    return this.webauthnService.availableAuthMethods(req.user.id);
  }
}
