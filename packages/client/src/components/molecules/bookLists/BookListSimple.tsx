import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { booksState } from '../../../states/atoms/book';
import { BookCard } from '../BookCard';

const listWrap = css`
  display: flex;
  flex-wrap: wrap;
`;

const item = css`
  padding: 24px;
`;

export const BookListSimple = () => {
  const books = useRecoilValue(booksState);

  return (
    <div css={listWrap}>
      {books.map((e) => (
        <div css={item} key={e.id}>
          <BookCard book={e} />
        </div>
      ))}
    </div>
  );
};
