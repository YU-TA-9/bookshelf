import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  handleHide: () => void;
};

const overlay = css`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const Overlay = ({ children, handleHide }: Props) => {
  return (
    <>
      {children}
      <div css={overlay} onClick={handleHide}></div>
    </>
  );
};
