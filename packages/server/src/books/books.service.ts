import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Book } from '../books/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/createBookDto';
import { CreateBookSelfDto } from './dtos/createBookSelfDto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private httpService: HttpService,
  ) {}

  async getBookList(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne(id);
    if (!book) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found with ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return book;
  }

  async createBookSelf(createBookSelfDto: CreateBookSelfDto): Promise<Book> {
    const book = new Book();
    const { name, author, publisher, status, category, image_path } =
      createBookSelfDto;
    book.name = name;
    book.author = author;
    book.publisher = publisher;
    book.status = status;
    book.category = category;
    book.image_path = image_path;
    return await this.booksRepository.save(book);
  }

  createBook(createBookDto: CreateBookDto): Observable<Promise<Book>> {
    return this.httpService
      .get(
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&outOfStockFlag=1&isbn=${createBookDto.isbn}&applicationId=${process.env.RAKUTEN_APP_ID}`,
      )
      .pipe(
        map((response) => {
          console.info('Rakuten API search result:', response);
          const count = response.data.count;

          if (!count) {
            throw new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: `Not found with ${createBookDto.isbn}`,
              },
              HttpStatus.NOT_FOUND,
            );
          }

          const data = response.data.Items[0].Item;

          const book = new Book();
          // TODO: 重複排除用にISBNのカラムも作る
          book.name = data.title;
          book.author = data.author;
          book.publisher = data.publisherName;
          book.status = 1; // TODO: Entityでdefault値を設定する
          book.category = 0; // TODO: カテゴリー未設定時はNullとななるようNull許容にする
          book.image_path = data.largeImageUrl;
          return this.booksRepository.save(book);
        }),
      );
  }
}
