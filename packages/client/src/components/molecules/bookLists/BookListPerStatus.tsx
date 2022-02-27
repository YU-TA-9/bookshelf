import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { selectedBooksPerStatus } from '../../../states/selectors/book';
import { ParagraphHeaderText } from '../../atoms/ParagraphHeaderText';
import { BookCard } from '../BookCard';

type Props = {};

const listWrap = css`
  display: flex;
  flex-wrap: wrap;
  min-height: 176px;
`;

const item = css`
  padding: 24px;
`;

export const BookListPerStatus = ({}: Props) => {
  const booksPerStatus = useRecoilValue(selectedBooksPerStatus);

  return (
    <>
      <ParagraphHeaderText>読書中</ParagraphHeaderText>
      <div css={listWrap}>
        {booksPerStatus.working.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <ParagraphHeaderText>中断</ParagraphHeaderText>
      <div css={listWrap}>
        {booksPerStatus.pending.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <ParagraphHeaderText>読了</ParagraphHeaderText>
      <div css={listWrap}>
        {booksPerStatus.completed.map((e) => {
          return (
            <div css={item} key={e.id}>
              <BookCard book={e} />
            </div>
          );
        })}
      </div>
      <ParagraphHeaderText>未読</ParagraphHeaderText>
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
