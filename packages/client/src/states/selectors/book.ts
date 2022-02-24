import { selectorFamily } from 'recoil';
import { booksState } from '../atoms/book';

export const selectedBookState = selectorFamily({
  key: 'selectedBookState',
  get:
    (id: number) =>
    ({ get }) => {
      const books = get(booksState);
      return books.find((book) => book.id === id);
    },
});
