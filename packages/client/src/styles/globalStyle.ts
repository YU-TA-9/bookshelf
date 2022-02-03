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

  body {
    background-attachment: scroll;
    background-image: none;
    background-color: #e4e4e4;
    background-image: none;
    background-origin: padding-box;
    background-position-x: 0%;
    background-position-y: 0%;
    background-size: auto;
  }

  h1 {
    font-size: ${fontSize.large};
  }

  div,
  p {
    font-size: ${fontSize.normal};
  }

  li {
    list-style: none;
    font-size: ${fontSize.normal};
  }
`;
