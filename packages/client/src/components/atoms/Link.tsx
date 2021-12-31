import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type Props = {
  text: string;
  href: string;
};

const link = css`
  font-size: ${fontSize.normal};
  line-height: 28px;
  text-decoration-line: underline;
  color: #094067;
`;

export const Link = ({ text, href }: Props) => {
  return (
    <a css={link} href={href}>
      {text}
    </a>
  );
};
