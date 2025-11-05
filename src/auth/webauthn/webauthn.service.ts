import { WEBAUTHN_CONFIG } from '@/config/webauthn';
import { PrismaService } from '@/prisma.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/typescript-types';
import { AuthService } from '../auth.service';

const challenges: Map<number, string> = new Map();

type AuthenticatorCredential = {
  id: Buffer;
  type: 'public-key';
  transports: AuthenticatorTransport[];
  userId: number;
};

@Injectable()
export class WebauthnService {
  private rpName = WEBAUTHN_CONFIG.rpName;
  private rpID = WEBAUTHN_CONFIG.rpID;
  private origin = WEBAUTHN_CONFIG.origin;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async generateRegistrationOptions(userId: number, userName: string) {
    const userAuthenticators = await this.getUserAuthenticators(userId);

    const options = await generateRegistrationOptions({
      rpName: this.rpName,
      rpID: this.rpID,
      userID: new TextEncoder().encode(userId.toString()),
      userName: userName,
      userDisplayName: userName,
      attestationType: 'none',
      excludeCredentials: userAuthenticators.map((auth) => ({
        id: auth.id.toString('base64url'),
        type: 'public-key',
        transports: auth.transports,
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform',
      },
    });
    await this.saveChallenge(userId, options.challenge);

    return options;
  }

  async verifyRegistration(userId: number, response: RegistrationResponseJSON) {
    const expectedChallenge = await this.getChallenge(userId);
    if (!expectedChallenge) {
      throw new Error('Challenge not found');
    }

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: this.origin,
      expectedRPID: this.rpID,
    });

    if (verification.verified && verification.registrationInfo) {
      const { credential } = verification.registrationInfo;
      await this.saveAuthenticator({
        userId,
        credentialID: Buffer.from(credential.id, 'base64url'),
        credentialPublicKey: Buffer.from(credential.publicKey),
        counter: credential.counter,
        transports: credential.transports as AuthenticatorTransport[],
      });
    }

    return verification;
  }

  async generateAuthenticationOptions(identifier?: number | string) {
    let allowCredentials: AuthenticatorCredential[] | undefined = undefined;

    if (!identifier) throw new UnauthorizedException('Identifier is required');
    const userAuthenticators = await this.getUserAuthenticators(identifier);
    if (userAuthenticators.length === 0)
      throw new UnauthorizedException('No authenticators found for user');
    allowCredentials = userAuthenticators;

    const options = await generateAuthenticationOptions({
      rpID: this.rpID,
      allowCredentials: allowCredentials?.map((auth) => ({
        id: auth.id.toString('base64url'),
        transports: auth.transports,
      })),
      userVerification: 'preferred',
    });
    await this.saveChallenge(
      allowCredentials?.[0]?.userId || 0,
      options.challenge,
    );
    return options;
  }

  async verifyAuthentication(
    credentialID: string,
    response: AuthenticationResponseJSON,
  ) {
    const authenticator =
      await this.getAuthenticatorByCredentialID(credentialID);
    const expectedChallenge =
      (await this.getChallenge(authenticator.userId)) || '';
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: this.origin,
      expectedRPID: this.rpID,
      credential: {
        id: Buffer.from(credentialID, 'base64url').toString('base64url'),
        publicKey: authenticator.credentialPublicKey,
        counter: Number(authenticator.counter),
      },
    });

    if (!verification.verified) return { verification };

    await this.updateAuthenticatorCounter(
      credentialID,
      verification.authenticationInfo.newCounter,
    );

    const user = await this.prismaService.user.findUnique({
      where: { id: authenticator.userId },
    });

    const signIn = await this.authService.signIn(user!);
    return { verification, ...signIn };
  }

  private async getUserAuthenticators(
    identifier: string | number,
  ): Promise<AuthenticatorCredential[]> {
    return await this.prismaService.authenticator
      .findMany({
        where: {
          OR: [
            {
              userId: typeof identifier === 'number' ? identifier : -1,
            },
            {
              user: {
                email: '' + identifier,
              },
            },
            {
              user: {
                name: '' + identifier,
              },
            },
          ],
        },
        select: {
          credentialID: true,
          userId: true,
          transports: true,
        },
      })
      .then((authenticators) =>
        authenticators.map((auth) => ({
          id: Buffer.from(auth.credentialID),
          type: 'public-key',
          transports: auth.transports.split(',') as AuthenticatorTransport[],
          userId: auth.userId,
        })),
      );
  }

  private async saveChallenge(userId: number, challenge: string) {
    const saved = await this.cacheManager.set(
      `webauthn_challenge_${userId}`,
      challenge,
      5000,
    );
    challenges.set(userId, challenge);
    return saved;
  }

  private async getAuthenticatorByCredentialID(credentialID: string) {
    const authenticator = await this.prismaService.authenticator.findUnique({
      where: {
        credentialID: Buffer.from(credentialID, 'base64url'),
      },
    });

    if (!authenticator) {
      throw new Error('Authenticator not found');
    }

    return authenticator;
  }

  private async updateAuthenticatorCounter(
    credentialID: string,
    newCounter: number,
  ) {
    await this.prismaService.authenticator.update({
      where: {
        credentialID: Buffer.from(credentialID, 'base64url'),
      },
      data: {
        counter: newCounter,
      },
    });
  }

  private async saveAuthenticator(data: {
    userId: number;
    credentialID: Buffer;
    credentialPublicKey: Buffer;
    counter: number;
    transports?: AuthenticatorTransport[];
  }) {
    await this.prismaService.authenticator.create({
      data: {
        userId: data.userId,
        credentialID: new Uint8Array(data.credentialID),
        credentialPublicKey: new Uint8Array(data.credentialPublicKey),
        counter: data.counter,
        transports: data.transports?.join(',') || '',
      },
    });
  }

  private async getChallenge(userId: number) {
    const challenge = await this.cacheManager.wrap<string>(
      `webauthn_challenge_${userId}`,
      () => {
        return challenges.get(userId) || '';
      },
    );
    return challenge;
  }

  async availableAuthMethods(identifier: number | string) {
    const methods = ['password'];
    const authenticators = await this.getUserAuthenticators(identifier);
    if (authenticators.length > 0) methods.push('webauthn');
    return methods;
  }
}
