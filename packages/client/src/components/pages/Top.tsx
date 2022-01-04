import * as React from 'react';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookList } from '../organisms/BookList';
import { Title } from '../atoms/Title';

export const Top = () => {
  const [bookData, setBookData] = React.useState<Book[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBookList();
      setBookData(data);
    })();
  }, []);

  return (
    <MainTemplate>
      <Title text="TEST TOP" />
      <BookList books={bookData} />
    </MainTemplate>
  );
};
