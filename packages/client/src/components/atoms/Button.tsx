import { css } from '@emotion/react';

type Props = {
  label: string;
  onClick: (...args: any[]) => void;
};

const button = css`
  background: #3da9fc;
  border: 0;
  border-radius: 10px;
  width: 96px;
  padding: 4px 12px;
  font-size: 16px;
  text-align: center;
  color: #fffffe;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

export const Button = ({ label, onClick }: Props) => {
  return (
    <button css={button} onClick={onClick}>
      {label}
    </button>
  );
};
