import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { BooksService } from '../books/books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/createBookDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Book, isArray: true })
  getBookList(): Promise<Book[]> {
    return this.booksService.getBookList();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Book })
  getBook(@Param('id') id: number): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Post('/self')
  @ApiBody({
    type: CreateBookSelfDto,
  })
  @ApiCreatedResponse({ type: Book })
  async createBookSelf(
    @Body() createBookSelfDto: CreateBookSelfDto,
  ): Promise<Book> {
    return await this.booksService.createBookSelf(createBookSelfDto);
  }

  @Post()
  @ApiCreatedResponse({ type: Book })
  createBook(@Body() createBookDto: CreateBookDto): Observable<Promise<Book>> {
    return this.booksService.createBook(createBookDto);
  }
}
