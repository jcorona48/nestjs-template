import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { UtilsModule } from './common/utils/utils.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, ProductModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
