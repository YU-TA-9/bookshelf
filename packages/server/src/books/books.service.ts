import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/createBookDto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async getBookList() {
    return await this.booksRepository.find();
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    const { name, author, publisher, status, category, image_path } =
      createBookDto;
    book.name = name;
    book.author = author;
    book.publisher = publisher;
    book.status = status;
    book.category = category;
    book.image_path = image_path;
    return await this.booksRepository.save(book);
  }
}
