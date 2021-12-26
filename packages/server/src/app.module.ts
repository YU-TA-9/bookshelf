import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/reading_management.sqlite3',
      entities: ['./dist/**/*.entity{.ts,.js}'],
      migrations: ['./dist/src/migrations/*{.ts,.js}'],
      synchronize: false,
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
