import * as React from 'react';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookList } from '../organisms/BookList';
import { AddIcon } from '../atoms/AddIcon';
import { Modal } from '../atoms/Modal';
import { BookRegisterForm } from '../organisms/BookRegisterForm';

export const Top = () => {
  const [bookData, setBookData] = React.useState<Book[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBookList();
      setBookData(data);
    })();
  }, []);

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <MainTemplate title="TOP">
      <div>
        <BookList books={bookData} />
      </div>
      <AddIcon onClick={handleAdd} />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <BookRegisterForm />
      </Modal>
    </MainTemplate>
  );
};
