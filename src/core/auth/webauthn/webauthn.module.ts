import { PrismaService } from '@/core/prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { WebauthnController } from './webauthn.controller';
import { WebauthnService } from './webauthn.service';

@Module({
  controllers: [WebauthnController],
  providers: [WebauthnService, PrismaService],
  exports: [WebauthnService],
  imports: [forwardRef(() => AuthModule)],
})
export class WebauthnModule {}
