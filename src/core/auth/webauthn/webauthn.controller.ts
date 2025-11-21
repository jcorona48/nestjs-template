import { JwtAuthGuard } from '@/core/auth/guards/jwt.guard';
import { User } from '@/core/users/interfaces/users.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { AuthVerifyDto } from './dto/auth.dto';
import { RegisterVerifyDto } from './dto/register.dto';
import { WebauthnService } from './webauthn.service';
@Controller({
  path: 'auth/webauthn',
  version: '1',
})
export class WebauthnController {
  constructor(private readonly webauthnService: WebauthnService) {}

  @ApiBearerAuth('authorization')
  @UseGuards(JwtAuthGuard)
  @Get('register/start')
  async registerStart(@Request() req: ExpressRequest & { user: User }) {
    const { id, name } = req.user;
    return this.webauthnService.generateRegistrationOptions(id, name);
  }

  @ApiBearerAuth('authorization')
  @Post('register/verify')
  @UseGuards(JwtAuthGuard)
  async registerVerify(
    @Request() req: ExpressRequest & { user: User },
    @Body() body: RegisterVerifyDto,
  ) {
    return this.webauthnService.verifyRegistration(req.user.id, body.response);
  }

  @Get('authenticate/start/:identifier')
  @ApiParam({ name: 'identifier', required: false, type: String })
  async authenticateStart(@Param('identifier') identifier: string) {
    const parsed = +identifier;
    return this.webauthnService.generateAuthenticationOptions(
      !isNaN(parsed) ? parsed : identifier,
    );
  }

  @Post('authenticate/verify')
  async authenticateVerify(
    @Body()
    body: AuthVerifyDto,
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
