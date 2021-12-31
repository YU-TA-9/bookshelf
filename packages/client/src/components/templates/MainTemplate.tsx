import { css } from '@emotion/react';
import { Header } from '../organisms/Header';
import { Sidebar } from '../organisms/Sidebar';

type Props = {
  children?: React.ReactNode;
};

const background = css`
  z-index: 1;
  position: relative;
  width: 1512px;
  height: 982px;
  background: #e4e4e4;
`;

export const MainTemplate = ({ children }: Props) => {
  return (
    <div css={background}>
      <Header />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};
