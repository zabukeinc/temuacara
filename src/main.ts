import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { validationFormaterResponse } from './modules/base/helpers/error.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Http Request Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          code: HttpStatus.BAD_REQUEST,
          data: validationFormaterResponse(errors),
          message: 'BAD_REQUEST',
        });
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Karyonism API')
    .setDescription('API documentation for Karyonism backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
