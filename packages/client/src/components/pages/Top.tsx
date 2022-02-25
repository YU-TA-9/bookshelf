import * as React from 'react';
import { MainTemplate } from '../templates/MainTemplate';
import { BookList } from '../organisms/BookList';
import { AddIcon } from '../atoms/AddIcon';
import { Modal } from '../atoms/Modal';
import { BookRegisterForm } from '../organisms/BookRegisterForm';

export const Top = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <MainTemplate title="TOP">
      <div>
        <BookList />
      </div>
      <AddIcon onClick={handleAdd} />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <BookRegisterForm />
      </Modal>
    </MainTemplate>
  );
};
