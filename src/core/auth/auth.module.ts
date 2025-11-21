import { JWT_CONFIG, JwtConfig } from '@/config/jwt';
import { JwtStrategy } from '@/core/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/core/auth/strategies/local.strategy';
import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UsersModule } from '@/core/users/users.module';
import { PrismaService } from '@/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WebauthnModule } from './webauthn/webauthn.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtConfig,
    PrismaService,
  ],
  exports: [AuthService, WebauthnModule],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register(JWT_CONFIG as JwtModuleOptions),
    HashingModule,
    PassportModule,
    forwardRef(() => WebauthnModule),
  ],
})
export class AuthModule {}
