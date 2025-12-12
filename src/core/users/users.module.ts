import { HashingModule } from '@/core/common/hashing/hashing.module';
import { JWT_CONFIG } from '@/core/config/jwt';
import { PrismaService } from '@/core/prisma/prisma.service';
import { UsersController } from '@/core/users/users.controller';
import { UsersService } from '@/core/users/users.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions), HashingModule],
})
export class UsersModule {}
