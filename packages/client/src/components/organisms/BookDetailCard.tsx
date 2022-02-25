import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as clonedeep from 'lodash.clonedeep';
import { Book } from '../../api/generated';
import { dateText } from '../../utils/dateUtil';
import { fontSize } from '../../styles/fontSize';
import * as React from 'react';
import { MarkdownAndHTMLArea } from '../molecules/MarkdownAndHTMLArea';
import { Button } from '../atoms/Button';
import { STATUS, statusLabel } from '../../api/mappings/status';
import { Popup } from '../atoms/Popup';
import { api } from '../../api/apiFactory';
import { CategoryMenuElement } from '../atoms/CategoryMenuElement';
import { useNotificationBar } from '../../logics/UseNotificationBar';
import { categoriesState } from '../../states/atoms/category';
import { selectedCategoryState } from '../../states/selectors/category';
import { booksState, useBookUpdate } from '../../states/atoms/book';
import { MenuElement } from '../atoms/MenuElement';

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
  box-shadow: 0 0 8px gray;
`;

const bookTitle = css`
  font-size: ${fontSize.large};
  font-weight: 700;
`;

const selectable = (color: string = '#000000') => css`
  display: inline-block;
  cursor: pointer;
  color: ${color};
  border: 2px solid ${color};
  border-radius: 12px;
  padding: 4px;

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

export const BookDetailCard = ({ book }: Props) => {
  const [books, setBooks] = useRecoilState(booksState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const bookCategory = useRecoilValue(selectedCategoryState(book.category));
  const { notify } = useNotificationBar();
  const [showHTML, setShowHTML] = React.useState<boolean>(true);
  const [showCategory, setShowCategory] = React.useState<boolean>(false);
  const [showStatus, setShowStatus] = React.useState<boolean>(false);
  const [inputMarkdown, setInputMarkDown] = React.useState<string>(
    book.memo || '',
  );

  const updateBookState = (book: Book) => {
    const newBooks = clonedeep(books);
    newBooks[newBooks.findIndex((e) => e.id === book.id)] = book;
    setBooks(newBooks);
  };

  const handleShowCategory = async () => {
    setShowCategory(true);
  };

  const handleChangeCategory = async (id: number) => {
    const { data } = await api.booksControllerPatchBookCategory(book.id, {
      category: id,
    });

    const newBook = clonedeep(book);
    newBook.category = data.category;
    updateBookState(newBook);

    notify('カテゴリーを更新しました');
    setShowCategory(false);
  };

  const handleChangeStatus = async (id: number) => {
    const { data } = await api.booksControllerPatchBookStatus(book.id, {
      status: id,
    });

    const newBook = clonedeep(book);
    newBook.status = data.status;
    updateBookState(newBook);

    notify('ステータスを更新しました');
    setShowStatus(false);
  };

  const handleUpdateMemo = async () => {
    (async () => {
      try {
        const { data } = await api.booksControllerPatchBookMemo(book.id, {
          memo: inputMarkdown,
        });

        const newBook = clonedeep(book);
        newBook.memo = data.memo;
        updateBookState(newBook);

        notify('メモを更新しました');
      } catch (e) {}
    })();
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMarkDown(e.target.value);
  };

  return (
    <>
      <ul css={table}>
        <li>
          <img css={image} src={book?.image_path} />
        </li>
        <li css={bookTitle}>{book?.name}</li>
        <li>
          <p css={selectable(bookCategory?.color)} onClick={handleShowCategory}>
            {bookCategory?.name || '未設定'}
          </p>
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
                  key={e.id}
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
          <p
            css={selectable}
            onClick={() => {
              setShowStatus(true);
            }}
          >
            {book.status
              ? statusLabel[book.status]
              : statusLabel[STATUS.waiting]}
          </p>
          {showStatus && (
            <Popup
              position="absolute"
              width={180}
              top={0}
              left="50%"
              handleHide={() => {
                setShowStatus(false);
              }}
            >
              {Object.keys(statusLabel).map((key, i) => {
                return (
                  <MenuElement
                    key={key}
                    label={statusLabel[key]}
                    onClick={() => {
                      handleChangeStatus(Number(key));
                    }}
                  />
                );
              })}
            </Popup>
          )}
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
      <Button
        label="メモを更新"
        onClick={() => handleUpdateMemo()}
        width={180}
      />
    </>
  );
};
