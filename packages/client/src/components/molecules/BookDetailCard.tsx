import { css } from '@emotion/react';
import { Book } from '../../api/generated';

type Props = {
  book: Book;
};

const table = css`
  text-align: center;
`;

export const BookDetailCard = ({ book }: Props) => {
  return (
    <ul css={table}>
      <li>
        <img src={book?.image_path} />
      </li>
      <li>{book?.name}</li>
      <li>{book?.author}</li>
      <li>{book?.publisher}</li>
      <li>{book?.status}</li>
    </ul>
  );
};
