import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BooksService } from 'src/books/books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/createBookDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBookList() {
    return this.booksService.getBookList();
  }

  @Post('/self')
  async createBookSelf(
    @Body() createBookSelfDto: CreateBookSelfDto,
  ): Promise<Book> {
    return await this.booksService.createBookSelf(createBookSelfDto);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Observable<Promise<Book>> {
    return this.booksService.createBook(createBookDto);
  }
}
