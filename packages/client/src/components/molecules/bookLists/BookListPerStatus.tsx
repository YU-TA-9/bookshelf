import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { selectedBooksPerStatus } from '../../../states/selectors/book';
import { BookCard } from '../BookCard';

type Props = {};

const listWrap = css`
  display: flex;
  flex-wrap: wrap;
  min-height: 176px;
`;

const listHeader = css`
  font-weight: 700;
`;

const item = css`
  padding: 24px;
`;

export const BookListPerStatus = ({}: Props) => {
  const booksPerStatus = useRecoilValue(selectedBooksPerStatus);

  return (
    <>
      <p css={listHeader}>読書中</p>
      <div css={listWrap}>
        {booksPerStatus.working.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <p css={listHeader}>中断</p>
      <div css={listWrap}>
        {booksPerStatus.pending.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <p css={listHeader}>読了</p>
      <div css={listWrap}>
        {booksPerStatus.completed.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <p css={listHeader}>未読</p>
      <div css={listWrap}>
        {booksPerStatus.waiting.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
    </>
  );
};
