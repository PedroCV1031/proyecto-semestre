import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:4321';

  app.enableCors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Proyecto Semestre API')
    .setDescription('API para sistema de captura de víctimas con ranking y autenticación')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Gestión de usuarios')
    .addTag('victimas', 'Gestión de víctimas capturadas')
    .addTag('leaderboard', 'Ranking y recompensas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();