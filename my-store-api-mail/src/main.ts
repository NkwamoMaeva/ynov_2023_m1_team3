import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all routes
  app.enableCors();
  await app.listen(3031);
}
bootstrap();
