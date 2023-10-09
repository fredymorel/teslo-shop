import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
    );
    const config = new DocumentBuilder()
    .setTitle('Teslo RESFul API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //await app.listen(3000);
  await app.listen(process.env.PORT);
  logger.log(`App running on por${process.env.PORT}`)
}
bootstrap();
