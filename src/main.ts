import ConfigurationService from '@/core/services/configuration.service';
import UserRole from '@/core/types/user_role';
import CreateUserService from '@/modules/users/application/create_user.service';
import ICreateUserUseCase, {
  CreateUserParam,
} from '@/modules/users/domain/usecase/i_create_user_use_case';
import { CREATE_USER_SERVICE } from '@/modules/users/symbols';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Base APi')
    .setDescription('Base Api')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'DEV')
    .addTag('Base Api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configurationService = app.get(ConfigurationService);
  const service = app.get<CreateUserService>(CREATE_USER_SERVICE);

  await createUserAdmin(configurationService, service);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

async function createUserAdmin(
  configurationService: ConfigurationService,
  service: ICreateUserUseCase,
) {
  const param = new CreateUserParam(
    configurationService.get('ADMIN_EMAIL'),
    configurationService.get('ADMIN_EMAIL'),
    configurationService.get('ADMIN_PASSWORD'),
    UserRole.ADMIN,
  );
  await service.execute(param);
}
