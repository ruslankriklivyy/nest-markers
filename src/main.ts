import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'Super Secret (change it)',
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none', // must be 'none' to enable cross-site delivery
        secure: true, // must be true if sameSite='none'
      },
    }),
  );
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
