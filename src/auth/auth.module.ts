import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
})
export class AuthModule {}
