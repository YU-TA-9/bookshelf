import { css } from '@emotion/react';

type Props = {
  onClick: () => void;
  label: string;
  color?: string;
};

const element = (color: string) => css`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: ${color || '094067'};
  padding: 0 8px;
  cursor: pointer;

  & > span {
    padding: 4px;
    border: 2px solid ${color};
    border-radius: 8px;
  }

  &:hover {
    background: #a1d7ff;
  }
`;

export const CategoryMenuElement = ({ onClick, label, color }: Props) => {
  return (
    <div css={element(color)} onClick={onClick}>
      <span>{label}</span>
    </div>
  );
};
