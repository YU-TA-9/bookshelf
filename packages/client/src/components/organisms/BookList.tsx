import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../api/generated';
import { BookCard } from '../molecules/BookCard';

type Props = {
  books: Book[];
};

const listWrap = css`
  display: flex;
  flex-wrap: wrap;
`;

const item = css`
  padding: 24px;
`;

export const BookList = ({ books }: Props) => {
  const navigate = useNavigate();

  const handleDetailButton = (id: number) => {
    navigate(`/${id}`);
  };

  return (
    <div css={listWrap}>
      {books.map((book) => (
        <div css={item} key={book.id}>
          <BookCard
            title={book.name}
            imageSrc={book.image_path}
            onClick={() => {
              handleDetailButton(book.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
