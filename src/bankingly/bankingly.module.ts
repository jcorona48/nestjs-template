import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule, HttpModule],
  exports: [AuthModule, HttpModule],
})
export class BankinglyModule {}
