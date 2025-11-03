import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { DB_CONFIG } from './config/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaLibSQL({
      url: DB_CONFIG.url,
      authToken: DB_CONFIG.authToken,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
