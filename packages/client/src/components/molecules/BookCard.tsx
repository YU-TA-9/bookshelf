import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Book } from '../../api/generated';
// TODO: ダミー画像を用意する
import * as sampleImage from '../../assets/150x200.png';
import { selectedCategoryState } from '../../states/selectors/category';

type Props = {
  book: Book;
};

const image = (color?: string) => css`
  width: 80px;
  height: 120px;
  box-shadow: 0 0 8px ${color ? color : 'gray'};
  cursor: pointer;
`;

export const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();
  const category = useRecoilValue(selectedCategoryState(book.category));

  const handleClick = () => {
    navigate(`/${book.id}`);
  };

  return (
    <img
      onClick={handleClick}
      css={image(category?.color)}
      alt="image"
      src={book.image_path || sampleImage}
    />
  );
};
