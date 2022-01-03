import { css } from '@emotion/react';

type Props = {
  text: string;
};

const title = css`
  font-size: 24px;
  color: #094067;
  font-weight: 700;
`;

export const Title = ({ text }: Props) => {
  return <h2 css={title}>{text}</h2>;
};
