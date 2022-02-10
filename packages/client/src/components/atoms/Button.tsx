import { css } from '@emotion/react';

type Background = 'main' | 'sub';

type Props = {
  label: string;
  onClick: (...args: any[]) => void;
  width: number;
  background?: Background;
};

const button = (width: number, background: Background = 'main') => css`
  background: ${background === 'sub' ? '#fc3d3d' : '#3da9fc'};
  border: 0;
  border-radius: 10px;
  width: ${width}px;
  padding: 4px 12px;
  font-size: 16px;
  text-align: center;
  color: #fffffe;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

export const Button = ({ label, onClick, width, background }: Props) => {
  return (
    <button css={button(width, background)} onClick={onClick}>
      {label}
    </button>
  );
};
