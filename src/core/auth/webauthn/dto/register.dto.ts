import { ApiProperty } from '@nestjs/swagger';
import type { RegistrationResponseJSON } from '@simplewebauthn/typescript-types';

export class RegisterVerifyDto {
  @ApiProperty({
    description: 'The registration response from the client',
    type: 'object',
    properties: {
      id: { type: 'string' },
      rawId: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          attestationObject: { type: 'string' },
          clientDataJSON: { type: 'string' },
        },
      },
      type: { type: 'string' },
      extensions: { type: 'object', nullable: true, properties: {} },
    },
  })
  readonly response: RegistrationResponseJSON;
}
