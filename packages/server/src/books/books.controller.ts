import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/createBookDto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBookList() {
    return this.booksService.getBookList();
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.createBook(createBookDto);
  }
}
