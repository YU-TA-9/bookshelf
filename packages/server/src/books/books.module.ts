import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from 'src/books/books.controller';
import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    HttpModule.register({ timeout: 5000, maxRedirects: 1 }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
