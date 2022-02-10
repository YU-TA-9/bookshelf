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
  Req,
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
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Book, isArray: true })
  getBookList(@Req() req: AuthenticatedRequest): Promise<Book[]> {
    return this.booksService.getBookList(req.user);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Book })
  getBook(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
  ): Promise<Book> {
    return this.booksService.getBook(req.user, id);
  }

  @Post('/self')
  @ApiBody({
    type: CreateBookSelfDto,
  })
  @ApiCreatedResponse({ type: Book })
  async createBookSelf(
    @Req() req: AuthenticatedRequest,
    @Body() createBookSelfDto: CreateBookSelfDto,
  ): Promise<Book> {
    return await this.booksService.createBookSelf(req.user, createBookSelfDto);
  }

  @Post()
  @ApiCreatedResponse({ type: Book })
  createBook(
    @Req() req: AuthenticatedRequest,
    @Body() createBookDto: CreateBookDto,
  ): Observable<Promise<Book>> {
    return this.booksService.createBook(req.user, createBookDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteBook(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return this.booksService.deleteBook(req.user, id);
  }

  @Patch('/memo/:id')
  @HttpCode(HttpStatus.OK)
  patchBookMemo(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() patchBookMemoDto: PatchBookMemoDto,
  ) {
    return this.booksService.updateBookMemo(req.user, id, patchBookMemoDto);
  }

  @Patch('/status/:id')
  @HttpCode(HttpStatus.OK)
  patchBookStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() patchBookStatusDto: PatchBookStatusDto,
  ) {
    return this.booksService.updateBookStatus(req.user, id, patchBookStatusDto);
  }
}
