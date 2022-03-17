import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Book } from '../../api/generated';
// TODO: ダミー画像を用意する
import * as sampleImage from '../../assets/150x200.png';
import { selectedCategoryState } from '../../states/selectors/category';
import { calcElapsedDays } from '../../utils/dateUtil';

type Props = {
  book: Book;
};

const bookCard = css``;

const image = (color?: string) => css`
  width: 80px;
  height: 120px;
  box-shadow: 0 0 8px ${color ? color : 'gray'};
  cursor: pointer;
`;

const daysLabel = (elapsedDays?: number) => css`
  ${elapsedDays >= 7 ? 'color: #ff0000;' : ''}
  margin-bottom:4px;
`;

export const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();
  const category = useRecoilValue(selectedCategoryState(book.category));
  const elapsedDays = calcElapsedDays(book.updatedStatusAt);

  const handleClick = () => {
    navigate(`/${book.id}`);
  };

  return (
    <div css={bookCard}>
      <p css={daysLabel(elapsedDays)}>{elapsedDays}日</p>
      <img
        onClick={handleClick}
        css={image(category?.color)}
        alt={book.name}
        src={book.image_path || sampleImage}
      />
    </div>
  );
};
