import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type Props = {
  text: string;
};

const headerText = css`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize.header};
  color: #ffffff;
`;

export const HeaderText = ({ text }: Props) => {
  return <h1 css={headerText}>{text}</h1>;
};
