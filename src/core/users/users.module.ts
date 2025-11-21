import { JWT_CONFIG } from '@/config/jwt';
import { HashingModule } from '@/core/common/hashing/hashing.module';
import { UsersController } from '@/core/users/users.controller';
import { UsersService } from '@/core/users/users.service';
import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions), HashingModule],
})
export class UsersModule {}
