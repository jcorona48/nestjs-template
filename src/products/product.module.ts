import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UtilsModule } from '../common/utils/utils.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from '@/config/jwt';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [UtilsModule, JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
})
export class ProductModule {}
