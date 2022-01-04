import { css } from '@emotion/react';
import { fontSize } from '../../styles/fontSize';

type Props = {
  value: string | number;
  onChange: (...args: any) => void;
};

const textForm = css`
  font-size: ${fontSize.normal};
`;

export const TextForm = ({ value, onChange }: Props) => {
  return <input css={textForm} type="text" value={value} onChange={onChange} />;
};
