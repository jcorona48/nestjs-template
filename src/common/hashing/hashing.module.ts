import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { HashingConfig } from '@/config/hashing';

@Module({
  providers: [HashingService, HashingConfig],
  exports: [HashingService, HashingConfig],
})
export class HashingModule {}
