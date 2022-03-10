import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Book, CATEGORY_UNSET, Status } from '../books/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/createBookDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';
import { PatchBookMemoDto } from './dtos/patchBookMemoDto';
import { PatchBookStatusDto } from './dtos/patchBookStatusDto';
import { CurrentUser } from '../users/user.entity';
import { PatchBookCategoryDto } from './dtos/patch-book-category';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private httpService: HttpService,
  ) {}

  async getBookList(user: CurrentUser): Promise<Book[]> {
    return await this.booksRepository.find({ where: { userId: user.id } });
  }

  async getBook(user: CurrentUser, id: number): Promise<Book> {
    const book = await this.booksRepository.findOne(id, {
      where: { userId: user.id },
    });
    if (!book) {
      throw new NotFoundException(`Not found with ${id}`);
    }

    return book;
  }

  async createBookSelf(
    user: CurrentUser,
    createBookSelfDto: CreateBookSelfDto,
  ): Promise<Book> {
    const book = new Book(user.id);
    const { name, author, publisher } = createBookSelfDto;
    // TODO: WEBから使うようになったらISBNコードの保持を必須にするか検討する
    book.name = name;
    book.author = author;
    book.publisher = publisher;
    // set default
    book.status = Status.WAITING;
    book.category = CATEGORY_UNSET;
    try {
      return await this.booksRepository.save(book);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        // TODO: 検討
        throw new ConflictException(`Duplicated isbn:}`);
      } else {
        throw new InternalServerErrorException('error');
      }
    }
  }

  createBook(
    user: CurrentUser,
    createBookDto: CreateBookDto,
  ): Observable<Promise<Book>> {
    // TODO: RAKUTEN APPが正式なので直したい
    return this.httpService
      .get(
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&outOfStockFlag=1&isbn=${createBookDto.isbn}&applicationId=${process.env.RAKUTEN_API_ID}`,
      )
      .pipe(
        map(async (response) => {
          // TODO: 楽天APIのインターフェースを定義したい
          console.info('Rakuten API search result:', response);
          const count = response.data.count;

          if (!count) {
            throw new NotFoundException(`Not found with ${createBookDto.isbn}`);
          }

          const data = response.data.Items[0].Item;

          const book = new Book(user.id);
          book.isbn = createBookDto.isbn;
          book.name = data.title;
          book.author = data.author;
          book.publisher = data.publisherName;
          // set default
          book.status = Status.WAITING;
          book.category = CATEGORY_UNSET;
          book.image_path = data.largeImageUrl;
          // TODO: 重複チェックでエラーレスポンスを返すようにする
          try {
            return await this.booksRepository.save(book);
          } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
              throw new ConflictException(
                `Duplicated isbn: ${createBookDto.isbn}`,
              );
            } else {
              throw new InternalServerErrorException('error');
            }
          }
        }),
      );
  }

  async deleteBook(user: CurrentUser, id: number): Promise<void> {
    const book = await this.booksRepository.findOne(id, {
      where: { userId: user.id },
    });

    if (!book) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    const result = await this.booksRepository.remove(book);
  }

  async updateBookMemo(
    user: CurrentUser,
    id: number,
    patchBookMemoDto: PatchBookMemoDto,
  ): Promise<Book> {
    // TODO: findOneとどちらを使うか統一する
    const book = await this.booksRepository.findOneOrFail(id, {
      where: { userId: user.id },
    });

    if (!book) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    book.memo = patchBookMemoDto.memo;
    return await this.booksRepository.save(book);
  }

  async updateBookStatus(
    user: CurrentUser,
    id: number,
    patchBookStatusDto: PatchBookStatusDto,
  ): Promise<Book> {
    // TODO: findOneとどちらを使うか統一する
    const book = await this.booksRepository.findOneOrFail(id, {
      where: { userId: user.id },
    });
    if (!book) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    book.status = patchBookStatusDto.status;
    return await this.booksRepository.save(book);
  }

  async updateBookCategory(
    user: CurrentUser,
    id: number,
    patchBookCategoryDto: PatchBookCategoryDto,
  ): Promise<Book> {
    // TODO: findOneとどちらを使うか統一する
    const book = await this.booksRepository.findOneOrFail(id, {
      where: { userId: user.id },
    });
    if (!book) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    book.category = patchBookCategoryDto.category;
    return await this.booksRepository.save(book);
  }
}
