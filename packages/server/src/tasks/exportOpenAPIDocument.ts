import { SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { swaggerConfig } from '../configs/swagger';
import { AppModule } from '../app.module';
import { dump } from 'js-yaml';
import * as fs from 'fs-extra';
import * as path from 'path';

const bootstrap = async (): Promise<void> => {
  const modules = Reflect.getMetadata('imports', AppModule);
  const controllers = Reflect.getMetadata('controllers', AppModule);
  const providers = Reflect.getMetadata('providers', AppModule);

  const testingModule = await Test.createTestingModule({
    imports: modules,
    controllers: controllers,
    providers: providers,
  }).compile();

  const app = await testingModule.createNestApplication();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const yamlDocument = dump(document, {
    skipInvalid: true,
    noRefs: true,
  });
  const yamlPath = path.join('..', 'swagger/swagger-auto.yml');

  await fs.writeFile(yamlPath, yamlDocument);
};
bootstrap();
