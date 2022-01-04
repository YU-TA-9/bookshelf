import { css } from '@emotion/react';
import { Title } from '../atoms/Title';
import { Header } from '../organisms/Header';
import { Sidebar } from '../organisms/Sidebar';

type Props = {
  children?: React.ReactNode;
  title: string;
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
  width: calc(100% - 302px);
  top: 124px;
  left: 302px;
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

export const MainTemplate = ({ children, title }: Props) => {
  return (
    <div css={background}>
      <Header />
      <Sidebar />
      <div css={content}>
        <div css={titleArea}>
          <Title text={title} />
        </div>
        <div css={mainArea}>{children}</div>
      </div>
    </div>
  );
};
