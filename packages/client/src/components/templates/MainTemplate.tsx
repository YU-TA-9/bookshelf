import { css } from '@emotion/react';
import { Header } from '../organisms/Header';
import { Sidebar } from '../organisms/Sidebar';

type Props = {
  children?: React.ReactNode;
};

const background = css`
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100%;
  background: #e4e4e4;

  // FIXME: 仮で置いている
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

// FIXME: 仮で置いている
const content = css`
  position: absolute;
  top: 124px;
  left: 302px;
`;

export const MainTemplate = ({ children }: Props) => {
  return (
    <div css={background}>
      <Header />
      <Sidebar />
      <div css={content}>{children}</div>
    </div>
  );
};
