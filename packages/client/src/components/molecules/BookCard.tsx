import * as React from 'react';
import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';
import { color } from '../../styles/color';
import { Button } from '../atoms/Button';
import * as sampleImage from '../../assets/150x200.png';

type Props = {
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
};

const card = css`
  width: 210px;
  height: 280px;
  background: #fffffe;
  border: 4px solid #094067;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
`;

const imageWrap = css`
  & > img {
    width: 80px;
    height: 120px;
  }
`;

const titleText = css`
  margin: 16px auto;
  color: ${color.paragraph};
  font-size: ${fontSize.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BookCard = ({ title, imageSrc, onClick }: Props) => {
  return (
    <div css={card}>
      <div css={imageWrap}>
        <img alt="" src={imageSrc || sampleImage}></img>
      </div>
      <p css={titleText}>{title}</p>
      <div>
        <Button label="詳細" onClick={onClick}></Button>
      </div>
    </div>
  );
};
