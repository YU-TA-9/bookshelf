import { css } from '@emotion/react';
import * as React from 'react';
import { Button } from '../atoms/Button';
import { HTMLTextarea } from '../atoms/HTMLTextarea';
import { TextareaForm } from '../atoms/TextareaForm';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const markdownAndHtmlArea = css`
  position: relative;
  width: 100%;
  height: 400px;
`;

const buttonWrap = css`
  margin-bottom: 8px;
`;

const textFormWrap = (showHTML: boolean) => css`
  height: 100%;
  display: ${!showHTML ? 'block' : 'none'};
`;

const htmlTextAreaWrap = (showHTML: boolean) => css`
  height: 100%;
  display: ${showHTML ? 'block' : 'none'};
`;

export const MarkdownAndHTMLArea = ({ value, onChange }: Props) => {
  const [showHTML, setShowHTML] = React.useState<boolean>(false);
  return (
    <div css={markdownAndHtmlArea}>
      <div css={buttonWrap}>
        <Button
          label={showHTML ? 'to Markdown' : 'to HTML'}
          onClick={() => setShowHTML(!showHTML)}
          width={180}
        />
      </div>
      <div css={textFormWrap(showHTML)}>
        <TextareaForm value={value} onChange={onChange} />
      </div>
      <div css={htmlTextAreaWrap(showHTML)}>
        <HTMLTextarea value={value} />
      </div>
    </div>
  );
};
