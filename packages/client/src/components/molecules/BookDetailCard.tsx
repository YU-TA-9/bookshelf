import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { Book } from '../../api/generated';
import { StatusLabel } from '../atoms/StatusLabel';
import { dateText } from '../../utils/dateUtil';

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
      <li>{StatusLabel(book?.status)}</li>
      <li>{dateText(book?.createdAt)}</li>
    </ul>
  );
};
