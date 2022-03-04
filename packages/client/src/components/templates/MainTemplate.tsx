import { css } from '@emotion/react';
import { Title } from '../atoms/Title';
import { Header } from '../organisms/Header';
import { Sidebar } from '../organisms/Sidebar';

type Props = {
  children?: React.ReactNode;
  title: string;
};

const background = css`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #e4e4e4;
`;

const headerWrap = (height: number) => css`
  width: 100%;
  height: ${height}px;
`;

const sidebarWrap = (width: number, headerHeight: number) => css`
  height: calc(100vh - ${headerHeight}px);
  width: ${width}px;
`;

const content = (sidebarWidth: number, headerHeight: number) => css`
  width: calc(100% - ${sidebarWidth}px);
  height: calc(100vh - ${headerHeight}px);
  overflow: scroll;
`;

const titleArea = css`
  border-radius: 10px;
  margin: 16px;
  padding: 16px;
`;

const mainArea = css`
  background: #fffffe;
  border-radius: 10px;
  margin: 16px;
  padding: 16px;
`;

const headerHeight = 124;
const sidebarWidth = 256;

export const MainTemplate = ({ children, title }: Props) => {
  return (
    <div css={background}>
      <div css={headerWrap(headerHeight)}>
        <Header />
      </div>
      <div css={sidebarWrap(sidebarWidth, headerHeight)}>
        <Sidebar />
      </div>
      <div css={content(sidebarWidth, headerHeight)}>
        <div css={titleArea}>
          <Title>{title}</Title>
        </div>
        <div css={mainArea}>{children}</div>
      </div>
    </div>
  );
};
