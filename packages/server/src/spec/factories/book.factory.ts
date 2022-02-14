import { define } from '../helpers/seeder-wrapper.helper';
import { faker as fakerOrigin } from '@faker-js/faker';
import { Book, Status } from '../../books/book.entity';

define(Book, (faker: typeof fakerOrigin): Book => {
  const book = new Book();
  // 13桁
  book.isbn = String(
    faker.datatype.number({
      min: 10000000000000,
      max: 99999999999999,
    }),
  );
  book.name = faker.name.firstName() + faker.name.lastName();
  book.author = faker.name.firstName() + faker.name.lastName();
  book.publisher = faker.finance.accountName();
  // TODO: ランダムに定義するように修正
  book.status = Status.WAITING;
  // TODO: 規格が決まったら定義する
  book.category = 0;
  book.image_path = faker.image.abstract();
  book.memo = faker.lorem.paragraph();

  return book;
});

export default Book;
