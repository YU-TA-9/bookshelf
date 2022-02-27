import { css } from '@emotion/react';

type Props = {
  children: string;
};

const text = css`
  font-weight: 700;
`;

export const ParagraphHeaderText = ({ children }: Props) => {
  return <h3 css={text}>{children}</h3>;
};
