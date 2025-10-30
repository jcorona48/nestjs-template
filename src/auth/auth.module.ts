import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { HashingModule } from '@/common/hashing/hashing.module';
import { JWT_CONFIG, JwtConfig } from '@/config/jwt';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtConfig],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register(JWT_CONFIG as JwtModuleOptions),
    HashingModule,
    PassportModule,
  ],
})
export class AuthModule {}
