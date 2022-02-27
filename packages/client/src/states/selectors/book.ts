import { selector, selectorFamily } from 'recoil';
import { STATUS } from '../../api/mappings/status';
import { booksState } from '../atoms/book';
import { Book, Category } from '../../api/generated';
import { categoriesState } from '../atoms/category';
import { DEFAULT_CATEGORY_COLOR } from '../../constants/category';

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

export const selectedBooksPerCategory = selector({
  key: 'selectedBookPerCategory',
  get: ({ get }) => {
    const books = get(booksState);
    const categories = get(categoriesState);
    const booksPerCategory = books.reduce((prev, current) => {
      const targetElements = prev.find(
        (e) => e.category.id === current.category,
      );

      if (targetElements) {
        targetElements.books.push(current);
      } else {
        const category = categories.find((e) => e.id === current.category);
        prev.push({
          category: category || {
            id: 0,
            name: '未設定',
            color: DEFAULT_CATEGORY_COLOR,
          },
          books: [current],
        });
      }
      return prev;
    }, [] as { category: Category; books: Book[] }[]);

    return booksPerCategory.sort((a, b) => {
      if (a.category.id === 0) {
        return 1;
      } else if (b.category.id === 0) {
        return -1;
      } else if (a.category.id < b.category.id) {
        return -1;
      } else {
        return 1;
      }
    });
  },
});
