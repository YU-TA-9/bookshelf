import { css } from '@emotion/react';

type Props = {
  label: string;
  onClick: (...args: any[]) => void;
  width: number;
};

const button = (width: number) => css`
  background: #3da9fc;
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

export const Button = ({ label, onClick, width }: Props) => {
  return (
    <button css={button(width)} onClick={onClick}>
      {label}
    </button>
  );
};
