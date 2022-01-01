import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from '../books/books.controller';
import { Book } from '../books/book.entity';
import { BooksService } from '../books/books.service';
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
