import { useRecoilValue } from 'recoil';
import { BookListPerStatus } from '../molecules/bookLists/BookListPerStatus';
import { selectedBooksLength } from '../../states/selectors/book';

type Props = {};

export const BookList = ({}: Props) => {
  const booksLength = useRecoilValue(selectedBooksLength);

  return <>{!booksLength ? <p>本がありません</p> : <BookListPerStatus />}</>;
};
