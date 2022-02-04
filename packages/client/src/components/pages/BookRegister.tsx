import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { ModalPortal } from '../../logics/ModalPortal';
import { Scanner } from '../atoms/Scanner';
import { TextForm } from '../atoms/TextForm';
import { MainTemplate } from '../templates/MainTemplate';

export const BookRegister = () => {
  const [isbn, setIsbn] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');

  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    // バーコードから
    (async () => {
      if (!code) {
        return;
      }

      try {
        const response = await api.booksControllerCreateBook({ isbn: code });
        alert(`Success!\n${JSON.stringify(response.data)}`);
      } catch (e) {
        alert('Failed!!');
      } finally {
        setOpen(false);
      }
    })();
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await api.booksControllerCreateBook({ isbn: isbn });
      if (response.status !== 201) {
        alert('Failed!!');
      } else {
        alert(`Success!\n${JSON.stringify(response.data)}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScannerModalButton = () => {
    setOpen(true);
  };

  return (
    <MainTemplate title="書籍登録">
      <div>
        <TextForm value={isbn} onChange={handleChange} />
        <Button label="ISBNコードで登録" onClick={handleRegister} width={120} />
        <Button
          label="バーコードをスキャンして登録"
          onClick={handleScannerModalButton}
          width={200}
        />
        {open && (
          <ModalPortal>
            <Modal onClose={() => setOpen(false)}>
              <Scanner setValue={setCode} />
            </Modal>
          </ModalPortal>
        )}
      </div>
    </MainTemplate>
  );
};
