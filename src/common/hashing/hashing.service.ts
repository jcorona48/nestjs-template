import { HashingConfig } from '@/config/hashing';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  private readonly hashingOptions: argon2.Options & { raw?: false };
  private readonly isDevelop: boolean;

  constructor(private readonly hashingConfig: HashingConfig) {
    this.hashingOptions = {
      type: this.hashingConfig.type || argon2.argon2id,
      memoryCost: this.hashingConfig.memoryCost || 2 ** 16,
      timeCost: this.hashingConfig.timeCost || 5,
      parallelism: this.hashingConfig.parallelism || 1,
    };

    console.log('Hashing options:', this.hashingOptions);
    this.isDevelop = process.env['NODE_ENV'] !== 'production';
  }

  async hash(data: string): Promise<string> {
    return await argon2.hash(data, this.hashingOptions);
  }

  async verify(hash: string, data: string): Promise<boolean> {
    return await argon2.verify(hash, data, this.hashingOptions);
  }

  getConfig():
    | (argon2.Options & { raw?: false })
    | {
        message: string;
      } {
    if (!this.isDevelop) return { message: 'Development mode is off' };
    return this.hashingOptions;
  }
}
