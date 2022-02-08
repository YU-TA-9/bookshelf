import { css } from '@emotion/react';

const background = css`
  z-index: 1;
  width: 100%;
  height: 100vh;
  background: #e4e4e4;
`;

const contents = css`
  width: 100%;
  height: 100%;
`;

type Props = {
  children?: React.ReactNode;
};

export const NotUserTemplate = ({ children }: Props) => {
  return (
    <div css={background}>
      <div css={contents}>{children}</div>
    </div>
  );
};
