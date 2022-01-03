import { css } from '@emotion/react';

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
  }

  div,
  p {
    box-sizing: border-box;
  }

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
`;
