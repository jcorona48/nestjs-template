import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
