import { css, Interpolation, Theme } from '@emotion/react';

type ButtonTheme = 'main' | 'sub' | 'top';

type Props = {
  children: React.ReactNode;
  cssProps?: Interpolation<Theme>;
  onClick: (...args: any[]) => void;
  width?: number;
  background?: ButtonTheme;
  fullWidth?: boolean;
  inline?: boolean;
};

const button = (
  width?: number,
  background: ButtonTheme = 'main',
  fullWidth?: boolean,
  inline?: boolean,
) => css`
  ${inline && 'display: inline-block;'}
  background: ${background === 'sub'
    ? '#fc3d3d'
    : background === 'top'
    ? '#094067'
    : '#3da9fc'};
  border: 0;
  border-radius: 10px;
  ${fullWidth ? 'width: 100%;' : width && `width: ${width}px;`}
  padding: 4px 12px;
  font-size: 16px;
  text-align: center;
  color: #fffffe;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

export const Button = ({
  children,
  cssProps,
  onClick,
  width,
  background,
  fullWidth,
  inline,
}: Props) => {
  return (
    <button
      css={[button(width, background, fullWidth, inline), cssProps]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
