import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { UtilsModule } from './common/utils/utils.module';

@Module({
  imports: [ProductModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
