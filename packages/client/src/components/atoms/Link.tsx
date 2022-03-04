import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { fontSize } from '../../styles/fontSize';

type Props = {
  isReactRouter?: boolean;
  text: string;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const link = css`
  font-size: ${fontSize.normal};
  line-height: 28px;
  color: #5f6c7b;

  &:hover {
    opacity: 0.7;
  }
`;

export const LinkText = ({ isReactRouter, text, to, onClick }: Props) => {
  return isReactRouter ? (
    <Link css={link} to={to}>
      {text}
    </Link>
  ) : (
    <a css={link} href={to} onClick={onClick}>
      {text}
    </a>
  );
};
