import { css } from '@emotion/react';

type Props = {
  onClick: () => void;
};

const icon = css`
  position: relative;
  cursor: pointer;
  background: #3da9fc;
  border-radius: 4px;
  width: 56px;
  height: 56px;

  & > hr {
    position: relative;
    margin: 0 8px;
    height: 4px;
    border: none;
    background: #fffffe;
  }

  & > hr:nth-of-type(1) {
    top: 20%;
  }

  & > hr:nth-of-type(2) {
    top: 40%;
  }

  & > hr:nth-of-type(3) {
    top: 60%;
  }
`;

export const SiteMenuIcon = ({ onClick }: Props) => {
  return (
    <div css={icon} onClick={onClick}>
      <hr />
      <hr />
      <hr />
    </div>
  );
};
