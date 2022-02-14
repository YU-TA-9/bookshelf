import { forwardRef, HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BooksModule } from './books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ormconfig } from '../configs/ormconfig_test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from '../auth/auth.module';
import {
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
  factory,
} from 'typeorm-seeding';
import { Book } from './book.entity';
import { User } from '../users/user.entity';
import { loginAs, serialize } from '../spec/helpers/test.helper';

describe('Books', () => {
  let app: INestApplication;
  let typeormConfig;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        forwardRef(() =>
          ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            ignoreEnvFile: false,
            load: [ormconfig],
          }),
        ),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            typeormConfig = configService.get('database');
            return typeormConfig;
          },
        }),
        AuthModule,
        BooksModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    //DBに接続＆内部のデータをクリア
    await useRefreshDatabase({
      root: './src/configs/',
      configName: 'ormconfig_test.ts',
      connection: typeormConfig,
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
});
