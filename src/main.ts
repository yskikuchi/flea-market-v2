import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORSの設定
  // app.enableCors({
  //   origin: ['http://example.com:1234'],
  //   methods: ['GET', 'POST'],
  // });

  const config = new DocumentBuilder()
    .setTitle('FLEA MARKET API')
    .setDescription('FLEA MARKET API description')
    .setVersion('1.0')
    .addTag('flea-market')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
