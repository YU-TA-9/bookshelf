import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  handleHide: () => void;
};

const wrap = css`
  display: inline-block;
`;

const contents = css`
  z-index: 10001;
  position: relative;
`;

const overlay = css`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

// TODO: contentsのz-indexの指定の仕方が微妙なので問題起きたら見直す
// childrenに直接指定できるようにしたい
export const Overlay = ({ children, handleHide }: Props) => {
  return (
    <div css={wrap}>
      <div css={contents}>{children}</div>
      <div css={overlay} onClick={handleHide}></div>
    </div>
  );
};
