import { css, Interpolation, Theme } from '@emotion/react';

type Background = 'main' | 'sub';

type Props = {
  cssProps?: Interpolation<Theme>;
  label: string;
  onClick: (...args: any[]) => void;
  width?: number;
  background?: Background;
  fullWidth?: boolean;
  inline?: boolean;
};

const button = (
  width?: number,
  background: Background = 'main',
  fullWidth?: boolean,
  inline?: boolean,
) => css`
  ${inline && 'display: inline-block;'}
  background: ${background === 'sub' ? '#fc3d3d' : '#3da9fc'};
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
  cssProps,
  label,
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
      {label}
    </button>
  );
};
