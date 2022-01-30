import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://bookshelf.yu-ta-9.com']
        : ['http://localhost:4000'],
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
  };
  app.enableCors(corsOptions);
  // FIXME: 共通化する
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'healthz', method: RequestMethod.GET }],
  });
  await app.listen(3000);
}
bootstrap();
