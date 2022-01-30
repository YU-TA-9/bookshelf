import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Reading Management API')
  .setDescription('API Docs')
  .setVersion('1.0')
  // MEMO: openapi-generatorのcliの引数指定でドメインを変更させるため、以下の記法で表現している
  .addServer('{environment}', undefined, {
    environment: {
      enum: [
        'http://localhost:3000',
        'https://api.bookshelf.yu-ta-9.com', // TODO: NODEの環境変数から取得してコードに残らないようにしたい
      ],
      default: 'http://localhost:3000',
    },
  })
  .build();
