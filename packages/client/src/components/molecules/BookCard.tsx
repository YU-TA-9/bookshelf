import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { Category } from '../../api/generated';
// TODO: ダミー画像を用意する
import * as sampleImage from '../../assets/150x200.png';
import { selectedCategoryState } from '../../states/selectors/category';

type Props = {
  imageSrc: string;
  onClick: () => void;
  categoryId?: number;
};

const card = css`
  background: #fffffe;
  padding: 8px;
  text-align: center;
`;

const imageWrap = (color?: string) => css`
  & > img {
    width: 80px;
    height: 120px;
    box-shadow: 0 0 8px ${color ? color : 'gray'};
    cursor: pointer;
  }
`;

export const BookCard = ({ imageSrc, onClick, categoryId }: Props) => {
  const category = useRecoilValue(selectedCategoryState(categoryId));

  return (
    <div css={card}>
      <div css={imageWrap(category?.color)} onClick={onClick}>
        <img alt="image" src={imageSrc || sampleImage}></img>
      </div>
    </div>
  );
};
