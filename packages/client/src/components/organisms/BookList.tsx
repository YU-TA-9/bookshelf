import { css } from '@emotion/react';
import { Book } from '../../api/generated';
import { BookCard } from '../molecules/BookCard';

type Props = {
  books: Book[];
  onClick: () => void;
};

const listWrap = css`
  display: flex;
  flex-wrap: wrap;
`;

const item = css`
  padding: 24px;
`;

export const BookList = ({ books, onClick }: Props) => {
  return (
    <div css={listWrap}>
      {books.map((book) => (
        <div css={item} key={book.id}>
          <BookCard title={book.name} onClick={onClick} />
        </div>
      ))}
    </div>
  );
};
