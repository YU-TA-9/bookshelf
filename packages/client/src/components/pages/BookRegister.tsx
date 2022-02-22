import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { ModalPortal } from '../../logics/ModalPortal';
import { Scanner } from '../atoms/Scanner';
import { TextForm } from '../atoms/TextForm';
import { MainTemplate } from '../templates/MainTemplate';
import { useNotificationBar } from '../../logics/UseNotificationBar';

export const BookRegister = () => {
  const { notify } = useNotificationBar();
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
        notify(`「${response.data.name}」を登録しました`);
      } finally {
        setOpen(false);
      }
    })();
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value);
  };

  const handleRegister = async () => {
    const response = await api.booksControllerCreateBook({ isbn: isbn });
    if (response.status !== 201) {
      notify('失敗しました', 'sub');
    } else {
      notify(`「${response.data.name}」を登録しました`);
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
