import { css } from '@emotion/react';
import { markdownStyle } from '../../styles/markdown';
import { convertMarkdownToHTML } from '../../utils/sanitize';

type Props = {
  value: string;
};

const htmlTextarea = css`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const HTMLTextarea = ({ value }: Props) => {
  return (
    <div
      css={[htmlTextarea, markdownStyle]}
      dangerouslySetInnerHTML={convertMarkdownToHTML(value)}
    />
  );
};
