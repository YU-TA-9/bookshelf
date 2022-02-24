import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { MainTemplate } from '../templates/MainTemplate';
import { BookList } from '../organisms/BookList';
import { AddIcon } from '../atoms/AddIcon';
import { Modal } from '../atoms/Modal';
import { BookRegisterForm } from '../organisms/BookRegisterForm';
import { booksState } from '../../states/atoms/book';

export const Top = () => {
  const books = useRecoilValue(booksState);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <MainTemplate title="TOP">
      <div>
        <BookList books={books} />
      </div>
      <AddIcon onClick={handleAdd} />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <BookRegisterForm />
      </Modal>
    </MainTemplate>
  );
};
