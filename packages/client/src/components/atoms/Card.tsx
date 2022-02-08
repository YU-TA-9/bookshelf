import { css } from '@emotion/react';

const cardWrap = css`
  background: #fffffe;
  border: 4px solid #094067;
  border-radius: 10px;
  padding: 8px;
`;

type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return <div css={cardWrap}>{children}</div>;
};
