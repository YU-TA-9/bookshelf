import { css } from '@emotion/react';

type Props = {
  color: string;
  onClick?: () => void;
};

const colorIcon = (color: string, onClick?: () => void) => css`
  background: ${color};
  width: 24px;
  height: 24px;
  ${onClick && 'cursor: pointer;'}
  vertical-align: middle;
  display: inline-block;
  margin-right: 8px;
`;

export const ColorIcon = ({ color, onClick }: Props) => {
  return <div css={colorIcon(color, onClick)} onClick={onClick} />;
};
