import { SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { swaggerConfig } from '../configs/swagger';
import { AppModule } from '../app.module';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RequestMethod } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Book } from '../books/book.entity';
import { Category } from '../categories/category.entity';

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

  const booksRepository = getRepository(Book);
  const categoriesRepository = getRepository(Category);

  const booksRecords = await booksRepository.find();
  const categoriesData = await categoriesRepository.find();

  // TODO: Google Driveにスプレッドシートとして出力するようにしたい
  console.info(booksRecords);
  console.info(categoriesData);

  process.exit(0);
};
bootstrap();
