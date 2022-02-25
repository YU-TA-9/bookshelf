import { selector, selectorFamily } from 'recoil';
import { STATUS } from '../../api/mappings/status';
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

export const selectedBooksLength = selector({
  key: 'selectedBookPerStatus',
  get: ({ get }) => {
    const books = get(booksState);
    return books.length;
  },
});

export const selectedBooksPerStatus = selector({
  key: 'selectedBookPerStatus',
  get: ({ get }) => {
    const booksPerStatus = {
      waiting: [],
      working: [],
      completed: [],
      pending: [],
    };
    const books = get(booksState);
    books.map((e) => {
      switch (e.status) {
        case STATUS.waiting:
          booksPerStatus.waiting.push(e);
          break;
        case STATUS.working:
          booksPerStatus.working.push(e);
          break;
        case STATUS.completed:
          booksPerStatus.completed.push(e);
          break;
        case STATUS.pending:
          booksPerStatus.pending.push(e);
          break;
        default:
          throw new Error('Invalid parameter');
      }
    });

    return booksPerStatus;
  },
});
