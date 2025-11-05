import { ApiProperty } from '@nestjs/swagger';
import type { AuthenticationResponseJSON } from '@simplewebauthn/typescript-types';

export class AuthVerifyDto {
  @ApiProperty({
    description: 'The authentication response from the client',
    type: 'object',
    properties: {
      id: { type: 'string' },
      rawId: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          authenticatorData: { type: 'string' },
          clientDataJSON: { type: 'string' },
          signature: { type: 'string' },
          userHandle: { type: 'string', nullable: true },
        },
      },
      type: { type: 'string' },
      extensions: { type: 'object', nullable: true, properties: {} },
    },
  })
  readonly response: AuthenticationResponseJSON;
}
