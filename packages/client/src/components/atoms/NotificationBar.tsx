import { css } from '@emotion/react';
import { Type } from '../../logics/NotificationRoot';

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
`;

export const NotificationBar = ({ text, type }: Props) => {
  return <div css={bar(type)}>{text}</div>;
};
