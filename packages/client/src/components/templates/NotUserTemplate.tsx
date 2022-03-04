import { css } from '@emotion/react';
import { Title } from '../atoms/Title';
import * as Logo from '../../assets/bookshelf_logo.png';

type Props = {
  children?: React.ReactNode;
};

const background = css`
  z-index: 1;
  width: 100%;
  height: 100vh;
  background: #d8eefe;
`;

const loginWrap = css`
  width: 100%;
  padding: 20px;
  margin: auto;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
`;

const logo = css`
  height: 92px;
  margin-bottom: 8px;
`;

const title = css`
  margin-bottom: 16px;
`;

export const NotUserTemplate = ({ children }: Props) => {
  return (
    <div css={background}>
      <div css={loginWrap}>
        <img css={logo} alt="logo" src={Logo} />
        <Title cssProps={title} titleTheme="top">
          Bookshelf
        </Title>
        {children}
      </div>
    </div>
  );
};
