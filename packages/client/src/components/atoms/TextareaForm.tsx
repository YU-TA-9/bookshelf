import { css } from '@emotion/react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const textarea = css`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const TextareaForm = ({ value, onChange }: Props) => {
  return <textarea css={textarea} value={value} onChange={onChange} />;
};
