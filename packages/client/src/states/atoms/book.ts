import { atom, useRecoilCallback } from 'recoil';
import { Book } from '../../api/generated/api';

export const booksState = atom<Book[]>({
  key: 'booksState',
  default: [],
});

export const useBookUpdate = (book: Book) => {
  const updateAtom = useRecoilCallback(({ snapshot, set }) => async () => {
    const books = await snapshot.getPromise(booksState);
    books[books.findIndex((e) => e.id === book.id)] = book;
    set(booksState, books);
  });
  return updateAtom;
};
