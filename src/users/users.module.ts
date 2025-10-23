import { UtilsService } from '@/common/utils/utils.service';
import { JWT_CONFIG } from '@/config/jwt';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilsService],
  exports: [UsersService],
  imports: [JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
})
export class UsersModule {}
