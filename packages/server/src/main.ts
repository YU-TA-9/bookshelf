import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Session
  const sessionOptions: session.SessionOptions = {
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };
  if (process.env.NODE_ENV === 'production') {
    sessionOptions.cookie.secure = true;
    app.set('trust proxy', 1);
  }
  app.use(session(sessionOptions));
  app.use(cookieParser(`${process.env.COOKIE_SECRET}`));

  // CORS
  const corsOptions = {
    origin:
      process.env.NODE_ENV === 'production'
        ? [`https://${process.env.DOMAIN}`]
        : ['http://localhost:4000'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'healthz', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
