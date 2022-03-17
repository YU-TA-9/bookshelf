import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
  factory,
} from 'typeorm-seeding';
import { Book, Status } from './book.entity';
import { User } from '../users/user.entity';
import { loginAs, serialize } from '../spec/helpers/test.helper';
import { CreateBookDto } from './dtos/createBookDto';
import { getRepository, Repository } from 'typeorm';
import { PatchBookMemoDto } from './dtos/patchBookMemoDto';
import faker from '@faker-js/faker';
import { AppModule } from '../app.module';
import { PatchBookStatusDto } from './dtos/patchBookStatusDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Category } from '../categories/category.entity';
import { PatchBookCategoryDto } from './dtos/patch-book-category';

describe('Books', () => {
  let app: INestApplication;
  let booksRepository: Repository<Book>;
  let httpService: HttpService;

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

    booksRepository = getRepository(Book);
    httpService = moduleRef.get<HttpService>(HttpService);
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

  it('GET /api/books', async () => {
    const user = await factory(User)().create();
    const book1 = await factory(Book)().create({ user: user });
    const book2 = await factory(Book)().create({ user: user });

    loginAs(user);

    const res = await request(app.getHttpServer()).get('/books');
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize([book1, book2])));
  });

  it('GET /api/books/:id', async () => {
    const user = await factory(User)().create();
    const book = await factory(Book)().create({ user: user });

    loginAs(user);

    const res = await request(app.getHttpServer()).get(`/books/${book.id}`);
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(book)));
  });

  it('POST /api/books', async () => {
    const user = await factory(User)().create();

    loginAs(user);

    const body: CreateBookDto = {
      isbn: '9784798150727',
    };

    // 楽天APIをモック化
    jest.spyOn(httpService, 'get').mockImplementation(() =>
      of({
        data: {
          Items: [
            {
              Item: {
                title: faker.name.title(),
                author: faker.name.firstName() + faker.name.lastName(),
                publisherName: faker.company.companyName(),
                image_path: faker.image.abstract(),
              },
            },
          ],
          count: 1,
        },
      } as AxiosResponse),
    );
    const res = await request(app.getHttpServer()).post('/books').send(body);

    const bookAndCount = await booksRepository.findAndCount({
      where: { userId: user.id },
    });

    expect(bookAndCount[1]).toBe(1);

    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body).toEqual(JSON.parse(serialize(bookAndCount[0][0])));
  });

  it('POST /api/books/self', async () => {
    const user = await factory(User)().create();

    loginAs(user);

    const name = faker.name.title();
    const author = faker.name.firstName() + faker.name.lastName();
    const publisher = faker.company.companyName();
    const body: CreateBookSelfDto = {
      name: name,
      author: author,
      publisher: publisher,
    };

    const res = await request(app.getHttpServer())
      .post('/books/self')
      .send(body);

    const bookAndCount = await booksRepository.findAndCount({
      where: { userId: user.id },
    });

    expect(bookAndCount[1]).toBe(1);

    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body).toEqual(JSON.parse(serialize(bookAndCount[0][0])));
  });

  it('PATCH /api/books/memo', async () => {
    const user = await factory(User)().create();
    const book = await factory(Book)().create({ user: user });

    loginAs(user);

    const memo = faker.lorem.paragraphs();
    const body: PatchBookMemoDto = {
      memo: memo,
    };

    const res = await request(app.getHttpServer())
      .patch(`/books/memo/${book.id}`)
      .send(body);

    const bookFromRecord = await booksRepository.findOne({
      where: { userId: user.id, id: book.id },
    });

    expect(bookFromRecord.memo).toEqual(memo);
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(bookFromRecord)));
  });

  it('PATCH /api/books/status', async () => {
    const user = await factory(User)().create();
    const book = await factory(Book)().create({ user: user });

    loginAs(user);

    // TODO: ランダムで取得するようにしたい
    const status = Status.READING;
    const body: PatchBookStatusDto = {
      status: status,
    };

    const res = await request(app.getHttpServer())
      .patch(`/books/status/${book.id}`)
      .send(body);

    const bookFromRecord = await booksRepository.findOne({
      where: { userId: user.id, id: book.id },
    });

    expect(bookFromRecord.status).toEqual(status);
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(bookFromRecord)));
  });

  it('PATCH /api/books/category', async () => {
    const user = await factory(User)().create();
    const book = await factory(Book)().create({ user: user });
    const category = await factory(Category)().create({ user: user });

    loginAs(user);

    const body: PatchBookCategoryDto = {
      category: category.id,
    };

    const res = await request(app.getHttpServer())
      .patch(`/books/category/${book.id}`)
      .send(body);

    const bookFromRecord = await booksRepository.findOne({
      where: { userId: user.id, id: book.id },
    });

    expect(bookFromRecord.category).toEqual(category.id);
    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toEqual(JSON.parse(serialize(bookFromRecord)));
  });

  it('DELETE /api/books/:id', async () => {
    const user = await factory(User)().create();
    const book = await factory(Book)().create({ user: user });

    loginAs(user);

    const res = await request(app.getHttpServer()).delete(`/books/${book.id}`);

    const bookAndCount = await booksRepository.findAndCount({
      where: { userId: user.id },
    });

    expect(bookAndCount[1]).toBe(0);
    expect(res.status).toEqual(HttpStatus.OK);
  });
});
