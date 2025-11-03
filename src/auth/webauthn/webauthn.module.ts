import { Module, forwardRef } from '@nestjs/common';
import { WebauthnService } from './webauthn.service';
import { WebauthnController } from './webauthn.controller';
import { PrismaService } from '@/prisma.service';
import { AuthModule } from '../auth.module';

@Module({
  controllers: [WebauthnController],
  providers: [WebauthnService, PrismaService],
  exports: [WebauthnService],
  imports: [forwardRef(() => AuthModule)],
})
export class WebauthnModule {}
