import { css } from '@emotion/react';

type Position = 'left' | 'center';
type Props = {
  position?: Position;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const white = '#ffffff';
const googleBlue = '#4285f4';
const buttonActiveColor = '#1669F2';

const wrap = (position: Position) => css`
  ${position === 'center' ? 'margin: 0 auto;' : ''}
  width: 184px;
  height: 42px;
  background-color: ${googleBlue};
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 6px ${googleBlue};
  }
  &:active {
    background: ${buttonActiveColor};
  }
`;

const iconWrap = css`
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: ${white};
`;

const icon = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
`;

const buttonText = css`
  float: right;
  width: 144px;
  height: 42px;
  line-height: 42px;
  color: ${white};
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: 'Roboto';
`;

export const GoogleLoginButton = ({ position, text, onClick }: Props) => {
  return (
    <div css={wrap(position)} onClick={onClick}>
      <div css={iconWrap}>
        <img
          css={icon}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p css={buttonText}>
        <b>{text}</b>
      </p>
    </div>
  );
};
