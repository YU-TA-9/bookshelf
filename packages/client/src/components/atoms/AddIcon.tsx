import { css } from '@emotion/react';

type Props = {
  onClick: () => void;
};

const circle = css`
  background: #3da9fc;
  box-shadow: 0 0 8px gray;
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  right: 40px;
  bottom: 40px;

  & > hr {
    position: absolute;
    left: 25px;
    top: 48%;
    border: none;
    background: #fffffe;
    width: 32px;
    height: 4px;
    transition: all 0.2s ease-out;
  }

  & > hr:nth-of-type(1) {
    transform: rotate(90deg);
  }

  & > hr:nth-of-type(2) {
  }

  & > .curve-area {
    opacity: 0;
    position: absolute;
    border: 4px solid #fffffe;
    width: 30px;
    height: 40px;
    transition: all 0.2s ease-out;
  }

  & > #curve_area_left {
    top: 25%;
    left: 15%;

    border-left: none;
    border-top-left-radius: 1000px 200px;
    border-top-right-radius: 1000px 200px;
    border-bottom-left-radius: 1000px 200px;
    border-bottom-right-radius: 1000px 200px;
  }

  & > #curve_area_right {
    top: 25%;
    right: 15%;

    border-right: none;
    border-top-left-radius: 1000px 200px;
    border-top-right-radius: 1000px 200px;
    border-bottom-left-radius: 1000px 200px;
    border-bottom-right-radius: 1000px 200px;
  }

  &:hover {
    & > hr:nth-of-type(1) {
      transform: rotate(90deg);
      left: 50px;
    }

    & > hr:nth-of-type(2) {
      transform: rotate(90deg);
      left: -2px;
    }

    & > .curve-area {
      opacity: 1;
    }
  }
`;

export const AddIcon = ({ onClick }: Props) => {
  return (
    <div css={circle} onClick={onClick}>
      <hr />
      <hr />
      <div className="curve-area" id="curve_area_left" />
      <div className="curve-area" id="curve_area_right" />
    </div>
  );
};
