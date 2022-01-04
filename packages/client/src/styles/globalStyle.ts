import { css } from '@emotion/react';
import { fontSize } from './fontSize';

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: ${fontSize.large};
  }

  div,
  p {
    font-size: ${fontSize.normal};
  }

  ul,
  li {
    list-style: none;
    font-size: ${fontSize.normal};
  }
`;
