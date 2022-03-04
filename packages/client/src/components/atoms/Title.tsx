import { css, Interpolation, Theme } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type TitleTheme = 'main' | 'top';

type Props = {
  children: string;
  titleTheme?: TitleTheme;
  cssProps?: Interpolation<Theme>;
};

const title = (titleTheme: TitleTheme = 'main') => css`
  font-size: ${fontSize.large};
  color: ${titleTheme === 'top' ? '#5F6C7B' : '#094067'};
  font-weight: 700;
`;

export const Title = ({ cssProps, children, titleTheme }: Props) => {
  return <h1 css={[title(titleTheme), cssProps]}>{children}</h1>;
};
