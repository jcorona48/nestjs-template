import { ConfigifyModule } from '@itgorillaz/configify';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankinglyModule } from './bankingly/bankingly.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    CacheModule.register({
      isGlobal: true,
    }),
    BankinglyModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
