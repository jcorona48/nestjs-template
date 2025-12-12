import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};

@Configuration()
export class JwtConfig {
  @IsString()
  @Value('JWT_SECRET', {
    default: JWT_CONFIG.secret,
  })
  public readonly secret!: string;

  @IsString()
  @Value('JWT_EXPIRES_IN', {
    default: JWT_CONFIG.signOptions.expiresIn,
  })
  public readonly expiresIn!: string;
}
