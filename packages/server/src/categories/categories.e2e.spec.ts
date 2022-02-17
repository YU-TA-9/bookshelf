import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
  factory,
} from 'typeorm-seeding';
import { User } from '../users/user.entity';
import {
  getRandomColorCode,
  loginAs,
  serialize,
} from '../spec/helpers/test.helper';
import { getRepository, Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import faker from '@faker-js/faker';
import { PatchCategoryDto } from './dtos/patch-category.dto';

describe('Categories', () => {
  let app: INestApplication;
  let categoriesRepository: Repository<Category>;

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

    categoriesRepository = getRepository(Category);
  });

  beforeEach(async () => {
    //DBに接続＆内部のデータをクリア
    await useRefreshDatabase({
      root: './src/configs/',
      configName: 'ormconfig.ts',
    });
    // factories loaded
    await useSeeding();
    // await runSeeder(CreateBooksSeed);
  });

  afterAll(async () => {
    await app.close();
    await tearDownDatabase();
  });

  it('GET /api/categories', async () => {
    const user = await factory(User)().create();
    const category1 = await factory(Category)().create({ user: user });
    const category2 = await factory(Category)().create({ user: user });

    loginAs(user);

    const res = await request(app.getHttpServer()).get('/categories');
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize([category1, category2])));
  });

  it('POST /api/categories', async () => {
    const user = await factory(User)().create();

    loginAs(user);

    const body: CreateCategoryDto = {
      name: faker.name.jobTitle(),
      color: getRandomColorCode(),
    };

    const res = await request(app.getHttpServer())
      .post('/categories')
      .send(body);

    const categoriesAndCount = await categoriesRepository.findAndCount({
      where: { userId: user.id },
    });

    expect(categoriesAndCount[1]).toBe(1);

    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body).toEqual(JSON.parse(serialize(categoriesAndCount[0][0])));
  });

  it('PATCH /api/categories', async () => {
    const user = await factory(User)().create();
    const category = await factory(Category)().create({ user: user });

    loginAs(user);

    // TODO: ランダムで取得するようにしたい
    const name = faker.name.jobTitle();
    const color = getRandomColorCode();
    const body: PatchCategoryDto = {
      name: name,
      color: color,
    };

    const res = await request(app.getHttpServer())
      .patch(`/categories/${category.id}`)
      .send(body);

    const categoryFromRecord = await categoriesRepository.findOne({
      where: { userId: user.id },
    });

    expect(categoryFromRecord.name).toEqual(name);
    expect(categoryFromRecord.color).toEqual(color);
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(categoryFromRecord)));
  });

  it('DELETE /api/categories/:id', async () => {
    const user = await factory(User)().create();
    const category = await factory(Category)().create({ user: user });

    loginAs(user);

    const res = await request(app.getHttpServer()).delete(
      `/categories/${category.id}`,
    );

    const categoriesAndCount = await categoriesRepository.findAndCount({
      where: { userId: user.id },
    });

    expect(categoriesAndCount[1]).toBe(0);
    expect(res.status).toEqual(HttpStatus.OK);
  });
});
