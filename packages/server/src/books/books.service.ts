import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${createBookDto.isbn}&applicationId=${process.env.RAKUTEN_APP_ID}`,
      )
      .pipe(
        map((response) => {
          const book = new Book();
          const data = response.data.Items[0].Item;
          // TODO: 重複排除用にISBNのカラムも作る
          book.name = data.title;
          book.author = data.author;
          book.publisher = data.publisherName;
          book.status = 1; // TODO: Entityでdefault値を設定する
          book.category = 0; // TODO: カテゴリー未設定時はNullとななるようNull許容にする
          book.image_path = data.mediumImageUrl;
          return this.booksRepository.save(book);
        }),
      );
  }
}
