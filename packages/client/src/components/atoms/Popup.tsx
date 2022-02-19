import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  handleHide: () => void;
  position: 'absolute' | 'relative' | 'fixed';
  width?: number;
  top: number | string;
  left?: number | string;
  right?: number | string;
};

const wrap = css`
  display: inline-block;
  position: relative;
`;

const popup = (
  position: 'absolute' | 'relative' | 'fixed',
  width: number,
  top: number | string,
  left?: number | string,
  right?: number | string,
) => css`
  z-index: 10001;
  position: ${position};
  ${typeof top === 'string' ? `top: ${top};` : `top: ${top}px;`}
  ${left && (typeof left === 'string' ? `left: ${left};` : `left: ${left}px;`)}
  ${right &&
  (typeof right === 'string' ? `right: ${right};` : `right: ${right}px;`)}
  width: ${width}px;
  background: #fffffe;
  box-shadow: 0 0 8px gray;
  border-radius: 10px;
  padding: 8px 0;
`;

const overlay = css`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

// TODO: relative指定のdivが冗長になりうるのでいつか検討
export const Popup = ({
  children,
  handleHide,
  position,
  width,
  top,
  left,
  right,
}: Props) => {
  return (
    <div css={wrap}>
      <div css={popup(position, width, top, left, right)}>{children}</div>
      <div css={overlay} onClick={handleHide}></div>
    </div>
  );
};
