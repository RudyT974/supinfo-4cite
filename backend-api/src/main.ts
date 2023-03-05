import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
<<<<<<< HEAD

=======
>>>>>>> 1c1059840d0b13a4aa4d1dcb7f58dea26a51aceb
  await app.listen(3000);
}

bootstrap();
