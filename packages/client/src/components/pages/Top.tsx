import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { Button } from '../atoms/Button';
import { BookCard } from '../molecules/BookCard';
import { MainTemplate } from '../templates/MainTemplate';
import { BookList } from '../organisms/BookList';
import { Title } from '../atoms/Title';

export const Top = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = React.useState<Book[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBookList();
      setBookData(data);
    })();
  }, []);

  const handleDetailButton = () => {
    console.log('button click!');
    console.log(bookData);
    navigate('/#');
  };

  return (
    <MainTemplate>
      <Title text="TEST TOP" />
      <BookList books={bookData} onClick={handleDetailButton} />
    </MainTemplate>
  );
};
