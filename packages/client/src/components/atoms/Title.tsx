import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type Props = {
  text: string;
};

const title = css`
  font-size: ${fontSize.large};
  color: #094067;
  font-weight: 700;
`;

export const Title = ({ text }: Props) => {
  return <h1 css={title}>{text}</h1>;
};
