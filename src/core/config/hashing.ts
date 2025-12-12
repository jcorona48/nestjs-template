import { Configuration, Value } from '@itgorillaz/configify';
import * as argon2 from 'argon2';

export const HASHING_CONFIG = {
  memoryCost: Number.parseInt(process.env.ARGON2_MEMORY_COST || '4096'),
  type: process.env.ARGON2_TYPE || argon2.argon2id,
  timeCost: Number.parseInt(process.env.ARGON2_TIME_COST || '1'),
  parallelism: Number.parseInt(process.env.ARGON2_PARALLELISM || '1'),
};

@Configuration()
export class HashingConfig {
  @Value('ARGON2_MEMORY_COST', {
    default: HASHING_CONFIG.memoryCost,
  })
  public readonly memoryCost!: number;

  @Value('ARGON2_TYPE', {
    default: HASHING_CONFIG.type,
  })
  public readonly type!: argon2.Options['type'];

  @Value('ARGON2_TIME_COST', {
    default: HASHING_CONFIG.timeCost,
  })
  public readonly timeCost!: number;

  @Value('ARGON2_PARALLELISM', {
    default: HASHING_CONFIG.parallelism,
  })
  public readonly parallelism!: number;
}
