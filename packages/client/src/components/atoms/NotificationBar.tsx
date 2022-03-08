import { css } from '@emotion/react';
import { Type } from '../../logics/NotificationRoot';
import { MAX_WIDTH_SP } from '../../styles/media';

type Props = {
  text: string;
  type?: Type;
};

const bar = (type: Type = 'main') => css`
  background: ${type === 'sub' ? '#fc3d3d' : '#3da9fc'};
  color: #fffffe;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  min-width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 8px gray;

  @media (max-width: ${MAX_WIDTH_SP}) {
    min-width: 240px;
    max-width: 80%;
  }
`;

export const NotificationBar = ({ text, type }: Props) => {
  return <div css={bar(type)}>{text}</div>;
};
