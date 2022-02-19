import * as React from 'react';
import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';
import { color } from '../../styles/color';
import * as sampleImage from '../../assets/150x200.png';

type Props = {
  imageSrc: string;
  onClick: () => void;
};

const card = css`
  background: #fffffe;
  padding: 8px;
  text-align: center;
`;

const imageWrap = css`
  & > img {
    width: 80px;
    height: 120px;
    box-shadow: 0 0 8px gray;
    cursor: pointer;
  }
`;

export const BookCard = ({ imageSrc, onClick }: Props) => {
  return (
    <div css={card}>
      <div css={imageWrap} onClick={onClick}>
        <img alt="" src={imageSrc || sampleImage}></img>
      </div>
    </div>
  );
};
