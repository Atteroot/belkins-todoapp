import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = parseInt(process.env.PORT, 10);

  if (port == null) {
    port = 8000;
  }

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
