import { HashingConfig } from '@/core/config/hashing';
import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Module({
  providers: [HashingService, HashingConfig],
  exports: [HashingService, HashingConfig],
})
export class HashingModule {}
