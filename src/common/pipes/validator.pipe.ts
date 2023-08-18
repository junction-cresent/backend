import { ValidationPipe } from '@nestjs/common';

export const validationPipe = () =>
  new ValidationPipe({
    whitelist: true,
    transform: true,
    // exceptionFactory: (details) => '',
    transformOptions: {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      groups: ['flag:request'],
    },
  });
