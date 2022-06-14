import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const commonCorsOptions = {
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['localhost:9000'],
    ...commonCorsOptions,
  });

  const apiConfig = new DocumentBuilder()
      .setTitle('Invois API')
      .setDescription('Invois api documentation')
      .addBearerAuth()
      .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, apiConfig));

  applyGlobalValidationPipe(app);

  await app.listen(9090);
}
bootstrap();

function applyGlobalValidationPipe(app: INestApplication): void {
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );
}
