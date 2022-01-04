import { css } from '@emotion/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookDetailCard } from '../molecules/BookDetailCard';

const bookDetailWrap = css``;

type Params = {
  id: string;
};

export const BookDetail = (props) => {
  const { id } = useParams<Params>();
  const [book, setBook] = React.useState<Book>();

  // TODO: １回のみ呼ばれるようにする
  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBook(Number(id));
      setBook(data);
    })();
  });

  return (
    <MainTemplate>
      <div css={bookDetailWrap}>
        <BookDetailCard book={book} />
      </div>
    </MainTemplate>
  );
};
