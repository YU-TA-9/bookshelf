import { css } from '@emotion/react';
import { Book, Category } from '../../api/generated';
import { dateText } from '../../utils/dateUtil';
import { fontSize } from '../../styles/fontSize';
import * as React from 'react';
import { MarkdownAndHTMLArea } from '../molecules/MarkdownAndHTMLArea';
import { Button } from '../atoms/Button';
import { SelectBox } from '../atoms/SelectBox';
import { status, statusLabel } from '../../api/mappings/status';
import { Popup } from '../atoms/Popup';
import { api } from '../../api/apiFactory';
import { CategoryMenuElement } from '../atoms/CategoryMenuElement';
import { useNotificationBar } from '../../logics/UseNotificationBar';

const table = css`
  text-align: center;
  & > li {
    margin-bottom: 16px;
  }
`;

const image = css`
  height: 320px;
  box-shadow: 0 0 8px gray;
`;

const bookTitle = css`
  font-size: ${fontSize.large};
  font-weight: 700;
`;

const category = css`
  display: inline-block;
  cursor: pointer;

  &:hover {
    background: #e4e4e4;
  }
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
  const { notify } = useNotificationBar();
  const [showHTML, setShowHTML] = React.useState<boolean>(true);
  const [showCategory, setShowCategory] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const handleShowCategory = async () => {
    setShowCategory(true);
    if (!categories.length) {
      const { data } = await api.categoriesControllerGetCategories();
      setCategories(data);
    }
  };

  const handleChangeCategory = async (id: number) => {
    const { data } = await api.booksControllerPatchBookCategory(book.id, {
      category: id,
    });
    notify('カテゴリーを更新しました');
  };

  return (
    <>
      <ul css={table}>
        <li>
          <img css={image} src={book?.image_path} />
        </li>
        <li css={bookTitle}>{book?.name}</li>
        <li>
          <div css={category} onClick={handleShowCategory}>
            {book?.category || '未設定'}
          </div>
          {showCategory && (
            <Popup
              position="absolute"
              width={180}
              top={0}
              left="50%"
              handleHide={() => {
                setShowCategory(false);
              }}
            >
              {categories.map((e, i) => (
                <CategoryMenuElement
                  key={i}
                  onClick={() => handleChangeCategory(e.id)}
                  label={e.name}
                  color={e.color}
                />
              ))}
            </Popup>
          )}
        </li>
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
