import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaLibSQL({
      url: configService.getOrThrow<string>('db.url'),
      authToken: configService.getOrThrow<string>('db.authToken'),
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
