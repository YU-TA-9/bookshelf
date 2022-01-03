import * as React from 'react';
import { css } from '@emotion/react';
import { HeaderText } from '../atoms/HeaderText';

const header = css`
  z-index: 1000;
  position: absolute;
  width: 100%;
  height: 124px;
  left: 0;
  top: 0;
  background: #094067;
`;

const headerTextWrap = css`
  position: absolute;
  left: 45px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const Header = () => {
  return (
    <div css={header}>
      <div css={headerTextWrap}>
        <HeaderText text="Readable"></HeaderText>
      </div>
    </div>
  );
};
