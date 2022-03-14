import * as dayjs from 'dayjs';
import { selector } from 'recoil';
import { Book } from '../../api/generated';
import { booksState } from '../atoms/book';

export const selectedBooksPerCreatedMonth = selector({
  key: 'selectedBookPerCreatedMonth',
  get: ({ get }) => {
    const books = get(booksState);
    const booksPer = books.reduce((prev, current) => {
      const createdMonth = dayjs(current.createdAt).format('YYYY/MM');

      const targetElements = prev.find((e) => e.date === createdMonth);

      if (targetElements) {
        targetElements.books.push(current);
      } else {
        prev.push({
          date: createdMonth,
          books: [current],
        });
      }
      return prev;
    }, [] as { date: string; books: Book[] }[]);

    return booksPer.sort((a, b) => {
      if (dayjs(a.date).isBefore(b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  },
});
