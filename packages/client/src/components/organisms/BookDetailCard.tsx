import { css } from '@emotion/react';
import { Book } from '../../api/generated';
import { StatusLabel } from '../atoms/StatusLabel';
import { dateText } from '../../utils/dateUtil';
import { fontSize } from '../../styles/fontSize';
import * as React from 'react';
import { MarkdownAndHTMLArea } from '../molecules/MarkdownAndHTMLArea';
import { Button } from '../atoms/Button';

type Props = {
  book: Book;
  markdown: string;
  onMarkdownChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const table = css`
  text-align: center;
  & > li {
    margin-bottom: 16px;
  }
`;

const image = css`
  height: 320px;
`;

const bookTitle = css`
  font-size: ${fontSize.large};
  font-weight: 700;
`;

const buttonWrap = css`
  margin-bottom: 8px;
`;

export const BookDetailCard = ({ book, markdown, onMarkdownChange }: Props) => {
  const [showHTML, setShowHTML] = React.useState<boolean>(true);

  return (
    <>
      <ul css={table}>
        <li>
          <img css={image} src={book?.image_path} />
        </li>
        <li css={bookTitle}>{book?.name}</li>
        <li>{book?.author}</li>
        <li>{book?.publisher}</li>
        <li>{StatusLabel(book?.status)}</li>
        <li>{dateText(book?.createdAt)}</li>
      </ul>
      <div>
        <div css={buttonWrap}>
          <Button
            label={showHTML ? 'to Markdown' : 'to HTML'}
            onClick={() => setShowHTML(!showHTML)}
            width={180}
          />
        </div>
      </div>
      <div>
        <MarkdownAndHTMLArea
          value={markdown}
          onChange={onMarkdownChange}
          showHTML={showHTML}
        />
      </div>
    </>
  );
};
