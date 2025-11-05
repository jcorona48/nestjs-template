import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useLogger(new Logger());
  const config = new DocumentBuilder()
    .setTitle('Testing API')
    .setDescription('API for testing NestJS application')
    .setVersion('1.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .build();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    const isProd = process.env.NODE_ENV == 'production';
    if (!isProd) {
      console.log('http://localhost:' + (process.env.PORT ?? 3000) + '/api');
    }
  })
  .catch((err) => console.error('Error starting application:', err));
