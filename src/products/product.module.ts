import { JWT_CONFIG } from '@/config/jwt';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UtilsModule } from '../common/utils/utils.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [ProductService, ProductsResolver],
  controllers: [ProductController],
  imports: [UtilsModule, JwtModule.register(JWT_CONFIG as JwtModuleOptions)],
})
export class ProductModule {}
