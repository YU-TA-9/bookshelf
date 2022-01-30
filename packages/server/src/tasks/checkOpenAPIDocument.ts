import { SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { swaggerConfig } from '../configs/swagger';
import { AppModule } from '../app.module';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RequestMethod } from '@nestjs/common';

const load = (filename: string) => {
  const yamlText = fs.readFileSync(filename, 'utf8');
  return yaml.load(yamlText);
};

const dump = (object: any) => {
  return yaml.dump(object, {
    skipInvalid: true,
    noRefs: true,
  });
};

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
  // FIXME: 共通化する
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'healthz', method: RequestMethod.GET }],
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const newDump = dump(document);

  const yamlPath = path.join('..', 'swagger/swagger.yml');
  const origin = load(yamlPath);
  const originDump = dump(origin);

  console.log('origin:', originDump);
  console.log('new:', newDump);

  if (originDump === newDump) {
    console.log('SAME!!');
    process.exit(0);
  } else {
    console.log('DIFFER!!');
    process.exit(1);
  }
};
bootstrap();
