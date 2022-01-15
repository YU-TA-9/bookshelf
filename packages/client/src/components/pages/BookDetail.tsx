import { css } from '@emotion/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookDetailCard } from '../organisms/BookDetailCard';
import { Button } from '../atoms/Button';

const bookDetailWrap = css``;

type Params = {
  id: string;
};

export const BookDetail = (props) => {
  const { id } = useParams<Params>();
  const [book, setBook] = React.useState<Book>();

  const [inputMarkdown, setInputMarkDown] = React.useState<string>(
    book?.memo || '',
  );

  // TODO: １回のみ呼ばれるようにする
  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBook(Number(id));
      setBook(data);
    })();
  }, []);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMarkDown(e.target.value);
  };

  const handleUpdateMemo = async () => {
    (async () => {
      try {
        const { data } = await api.booksControllerPatchBookMemo(Number(id), {
          memo: inputMarkdown,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  };

  return (
    <MainTemplate title="書籍詳細">
      <div css={bookDetailWrap}>
        <BookDetailCard
          book={book}
          markdown={inputMarkdown}
          onMarkdownChange={handleMarkdownChange}
        />
      </div>
      <Button label="更新" onClick={() => handleUpdateMemo()} width={180} />
    </MainTemplate>
  );
};
