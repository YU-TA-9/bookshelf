import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookDetailCard } from '../organisms/BookDetailCard';
import { Button } from '../atoms/Button';
import { useNotificationBar } from '../../logics/UseNotificationBar';
import { selectedBookState } from '../../states/selectors/book';

const bookDetailWrap = css`
  margin-bottom: 16px;
`;

type Params = {
  id: string;
};

export const BookDetail = () => {
  const { id } = useParams<Params>();
  const book = useRecoilValue(selectedBookState(Number(id)));
  const { notify } = useNotificationBar();
  const navigate = useNavigate();

  const handleDelete = async () => {
    (async () => {
      try {
        if (confirm(`「${book.name}」を削除しますか？`)) {
          const { data } = await api.booksControllerDeleteBook(Number(id));
          notify('削除しました', 'sub');
          navigate('/');
        }
      } catch (e) {}
    })();
  };

  return (
    <MainTemplate title="書籍詳細">
      <div css={bookDetailWrap}>
        <BookDetailCard book={book} />
      </div>
      <Button
        label="本を削除"
        background="sub"
        onClick={() => handleDelete()}
        width={180}
      />
    </MainTemplate>
  );
};
