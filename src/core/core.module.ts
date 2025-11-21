import { ConfigifyModule } from '@itgorillaz/configify';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';
import { UtilsModule } from './common/utils/utils.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductModule,
    UtilsModule,
    HashingModule,
    ConfigifyModule.forRootAsync(),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  exports: [AuthModule, UsersModule, ProductModule, UtilsModule, HashingModule],
})
export class CoreModule {}
