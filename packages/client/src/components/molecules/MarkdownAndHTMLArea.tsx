import { css } from '@emotion/react';
import * as React from 'react';
import { HTMLTextarea } from '../atoms/HTMLTextarea';
import { TextareaForm } from '../atoms/TextareaForm';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  showHTML: boolean;
};
const defaultHeight = '400px';

const markdownAndHtmlArea = (showHTML: boolean) => css`
  display: flex;
  position: relative;
  width: 200%;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
  transform: ${showHTML ? 'translateX(-50%)' : 'translateX(0%)'};

  transition: transform ease-in 0.3s;
`;

const textFormWrap = (showHTML: boolean) => css`
  visibility: ${!showHTML ? 'visible' : 'hidden'};
  width: 100%;
`;

const htmlTextAreaWrap = (showHTML: boolean) => css`
  width: 100%;
  height: 100%;
  min-height: ${defaultHeight};
  visibility: ${showHTML ? 'visible' : 'hidden'};
`;

export const MarkdownAndHTMLArea = ({
  value,
  onChange,
  onBlur,
  showHTML,
}: Props) => {
  return (
    <div css={markdownAndHtmlArea(showHTML)}>
      <div css={textFormWrap(showHTML)}>
        <TextareaForm value={value} onChange={onChange} onBlur={onBlur} />
      </div>
      <div css={htmlTextAreaWrap(showHTML)}>
        <HTMLTextarea value={value} />
      </div>
    </div>
  );
};
