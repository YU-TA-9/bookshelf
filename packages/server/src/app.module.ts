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
      type: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: 'root',
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
