import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
  label: string;
  color?: string;
};

const element = (color: string) => css`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #${color || '094067'};
  padding: 0 8px;

  &:hover {
    background: #a1d7ff;
  }
`;

export const CategoryMenuElement = ({ onClick, label, color }: Props) => {
  return (
    <div css={element(color)} onClick={onClick}>
      {label}
    </div>
  );
};
