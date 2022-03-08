import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  label: string;
  onClick?: () => void;
};

const element = css`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #094067;
  padding: 0 8px;

  &:hover {
    background: #a1d7ff;
  }
`;

export const UserMenuElement = ({ to, label, onClick }: Props) => {
  return (
    <Link to={to} onClick={onClick}>
      <div css={element}>{label}</div>
    </Link>
  );
};
