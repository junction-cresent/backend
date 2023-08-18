import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

export const setupSwagger = async (app: INestApplication) => {
  const appInfo = await new AppService().getBackendInfo();
  const config = new DocumentBuilder()
    .setTitle(appInfo.name)
    .setDescription(appInfo.description)
    .setVersion(appInfo.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
