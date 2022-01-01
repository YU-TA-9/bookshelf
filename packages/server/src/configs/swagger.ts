import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Reading Management API')
  .setDescription('API Docs')
  .setVersion('1.0')
  .addServer('localhost:3000/api', 'local')
  .build();
