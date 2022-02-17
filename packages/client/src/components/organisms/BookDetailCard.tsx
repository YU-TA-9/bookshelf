import { css } from '@emotion/react';
import { Book } from '../../api/generated';
import { dateText } from '../../utils/dateUtil';
import { fontSize } from '../../styles/fontSize';
import * as React from 'react';
import { MarkdownAndHTMLArea } from '../molecules/MarkdownAndHTMLArea';
import { Button } from '../atoms/Button';
import { SelectBox } from '../atoms/SelectBox';
import { status, statusLabel } from '../../api/mappings/status';

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
  margin-bottom: 16px;
`;

const markdownAreaWrap = css`
  margin-bottom: 16px;
`;

type Props = {
  book: Book;
  selectedStatus: status;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  inputMarkdown: string;
  handleMarkdownChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const BookDetailCard = ({
  book,
  selectedStatus,
  handleStatusChange,
  inputMarkdown,
  handleMarkdownChange,
}: Props) => {
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
        <li>
          <SelectBox
            value={selectedStatus}
            options={Object.keys(statusLabel).map((key, i) => {
              return {
                value: key,
                label: statusLabel[key],
              };
            })}
            onChange={handleStatusChange}
          />
        </li>
        <li>{`登録日：${dateText(book?.createdAt)}`}</li>
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
      <div css={markdownAreaWrap}>
        <MarkdownAndHTMLArea
          value={inputMarkdown}
          onChange={handleMarkdownChange}
          showHTML={showHTML}
        />
      </div>
    </>
  );
};
