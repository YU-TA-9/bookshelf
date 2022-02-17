import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { loginAs, serialize } from '../spec/helpers/test.helper';
import {
  factory,
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';
import { AppModule } from '../app.module';

import * as request from 'supertest';
import { User } from './user.entity';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modules = Reflect.getMetadata('imports', AppModule);
    const controllers = Reflect.getMetadata('controllers', AppModule);
    const providers = Reflect.getMetadata('providers', AppModule);
    const moduleRef = await Test.createTestingModule({
      imports: modules,
      controllers: controllers,
      providers: providers,
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    //DBに接続＆内部のデータをクリア
    await useRefreshDatabase({
      root: './src/configs/',
      configName: 'ormconfig.ts',
    });
    // factories loaded
    await useSeeding();
  });

  afterAll(async () => {
    await app.close();
    await tearDownDatabase();
  });

  it('GET /api/user', async () => {
    const user = await factory(User)().create();

    loginAs(user);

    const res = await request(app.getHttpServer()).get('/user');
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(user)));
  });
});
