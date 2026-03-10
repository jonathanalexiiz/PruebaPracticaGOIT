import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefijo global
  app.setGlobalPrefix('api');

  // permitir peticiones desde Next.js
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  /* validación global de DTO
   * 1.- whitelist: true -> Solo deja pasar los campos que existen en el DTO.
   * 2.- transform: true -> Convierte automáticamente los datos al tipo esperado.
   * 3.- forbidNonWhitelisted: true -> Esto hace que en vez de ignorar campos extra, Nest lance error.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
