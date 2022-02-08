import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { BooksService } from '../books/books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/createBookDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';
import { PatchBookMemoDto } from './dtos/patchBookMemoDto';
import { PatchBookStatusDto } from './dtos/patchBookStatusDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
  }

  @Patch('/memo/:id')
  @HttpCode(HttpStatus.OK)
  patchBookMemo(
    @Param('id') id: number,
    @Body() patchBookMemoDto: PatchBookMemoDto,
  ) {
    return this.booksService.updateBookMemo(id, patchBookMemoDto);
  }

  @Patch('/status/:id')
  @HttpCode(HttpStatus.OK)
  patchBookStatus(
    @Param('id') id: number,
    @Body() patchBookStatusDto: PatchBookStatusDto,
  ) {
    return this.booksService.updateBookStatus(id, patchBookStatusDto);
  }
}
