import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const PORT: number = 3005;
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  console.log('Servidor corriendo en el puerto: ', PORT);
  await app.listen(PORT);
}
bootstrap();
