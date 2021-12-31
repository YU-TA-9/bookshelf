import * as React from 'react';
import { Global, css } from '@emotion/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Top } from './components/pages/Top';

const globalStyle = css`
  html,
  body,
  div,
  p {
    margin: 0;
    padding: 0;
  }

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
`;

export const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
