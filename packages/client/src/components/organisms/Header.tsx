import { css } from '@emotion/react';
import { HeaderText } from '../atoms/HeaderText';
import { Link } from 'react-router-dom';
import * as sampleLogo from '../../assets/title_logo_example.png';

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #094067;
`;

const logoWrap = css`
  width: 80px;
  height: 80px;
  margin-left: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const headerTextWrap = css`
  margin-left: 16px;
`;

export const Header = () => {
  return (
    <div css={header}>
      <div css={logoWrap}>
        <Link to="/">
          <img alt="logo" src={sampleLogo}></img>
        </Link>
      </div>
      <div css={headerTextWrap}>
        <HeaderText text="Readable"></HeaderText>
      </div>
    </div>
  );
};
