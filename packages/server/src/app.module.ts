import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

// TODO: CORS設定を付加する
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '' : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: 'reading_management',
      entities: ['./dist/**/*.entity{.ts,.js}'],
      migrations: ['./dist/src/migrations/*{.ts,.js}'],
      synchronize: false,
      connectTimeout: 30 * 1000,
      logging: true,
      cli: {
        entitiesDir: './dist/src',
        migrationsDir: './src/migrations',
      },
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
