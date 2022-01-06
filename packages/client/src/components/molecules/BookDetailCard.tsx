import { css } from '@emotion/react';
import { Book } from '../../api/generated';
import { StatusLabel } from '../atoms/StatusLabel';
import { dateText } from '../../utils/dateUtil';
import { fontSize } from '../../styles/fontSize';
import * as React from 'react';
import { convertMarkdownToHTML } from '../../utils/sanitize';
import { TextareaForm } from '../atoms/TextareaForm';
import { MarkdownAndHTMLArea } from './MarkdownAndHTMLArea';

type Props = {
  book: Book;
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

export const BookDetailCard = ({ book }: Props) => {
  const [markdown, setMarkDown] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkDown(e.target.value);
  };

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
        <MarkdownAndHTMLArea value={markdown} onChange={handleChange} />
      </div>
    </>
  );
};
