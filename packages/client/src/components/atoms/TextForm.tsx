import { css, Interpolation, Theme } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type Props = {
  cssProps?: Interpolation<Theme>;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, ...args: any) => void;
};

const textForm = css`
  font-size: ${fontSize.normal};
  padding: 4px;
`;

export const TextForm = ({ cssProps, value, placeholder, onChange }: Props) => {
  return (
    <input
      css={[textForm, cssProps]}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
