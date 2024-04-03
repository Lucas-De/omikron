import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function setupGlobals(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //removes unwanted extra properties
      transform: true, //converts queries, params and bodies to specified types
      forbidNonWhitelisted: true, //throws error when additional properties are present
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nutri Documentation')
    .setDescription('nothing to see here...')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupGlobals(app);
  setupSwagger(app);
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
