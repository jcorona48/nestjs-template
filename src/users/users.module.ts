import { HashingModule } from '@/common/hashing/hashing.module';
import { JWT_CONFIG } from '@/config/jwt';
import { PrismaService } from '@/prisma.service';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions), HashingModule],
})
export class UsersModule {}
