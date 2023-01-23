import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/httpException.filter';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NODE_ENV || 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  
  const config = new DocumentBuilder()
      .setTitle('사주 API')
      .setDescription('사주 API 문서입니다.')
      .setVersion('1.3.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, swaggerCustomOptions);
    
  await app.listen(port);
}
bootstrap();
