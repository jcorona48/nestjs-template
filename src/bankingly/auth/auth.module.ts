import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.getOrThrow<number>('bankingly.timeout'),
        maxRedirects: configService.getOrThrow<number>(
          'bankingly.maxRedirects',
        ),
        baseURL: configService.getOrThrow<string>('bankingly.apiUrl'),
        auth: {
          username: configService.getOrThrow<string>('bankingly.username'),
          password: configService.getOrThrow<string>('bankingly.password'),
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
