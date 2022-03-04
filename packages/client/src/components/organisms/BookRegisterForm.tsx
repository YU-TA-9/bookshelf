import { css } from '@emotion/react';
import * as React from 'react';
import { api } from '../../api/apiFactory';
import { useNotificationBar } from '../../logics/UseNotificationBar';
import { Button } from '../atoms/Button';
import { Scanner } from '../atoms/Scanner';
import { TextForm } from '../atoms/TextForm';

type Props = {
  isbn?: string;
};

const inputArea = css`
  display: flex;
  margin-bottom: 16px;
  height: 32px;
`;

const textForm = css`
  margin-right: 16px;
`;

const barcodeButtonsWrap = css`
  display: flex;
  margin-bottom: 16px;
`;

const barcodeOpenButton = css`
  margin-right: 16px;
`;

const scannerWrap = css`
  padding: 8px;
  border: 1px solid #e4e4e4;
  width: 480px;
  height: 480px;
`;

export const BookRegisterForm = ({}: Props) => {
  const { notify } = useNotificationBar();
  const [isbn, setIsbn] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const [openScanner, setOpenScanner] = React.useState<boolean>(false);

  React.useEffect(() => {
    // バーコードから
    (async () => {
      if (!code) {
        return;
      }

      try {
        const response = await api.booksControllerCreateBook({ isbn: code });
        notify(`「${response.data.name}」を登録しました`);
      } catch (e) {
        if (e.response.status !== 404) {
          notify('該当する書籍が見つかりませんでした', 'sub');
        } else {
          notify('ネットワークエラーです', 'sub');
        }
      } finally {
        setOpenScanner(false);
      }
    })();
  }, [code]);

  const handleRegister = async () => {
    try {
      const response = await api.booksControllerCreateBook({ isbn: isbn });
      notify(`「${response.data.name}」を登録しました`);
    } catch (e) {
      if (e.response.status !== 201) {
        notify('該当する書籍が見つかりませんでした', 'sub');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsbn(value);
  };

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseScanner = () => {
    setOpenScanner(false);
  };

  return (
    <div>
      <div css={inputArea}>
        <TextForm
          cssProps={textForm}
          value={isbn}
          placeholder="ISBN"
          onChange={handleChange}
        />
        <Button onClick={handleRegister} width={240}>
          手入力で登録
        </Button>
      </div>
      <div css={barcodeButtonsWrap}>
        <Button
          cssProps={barcodeOpenButton}
          onClick={handleOpenScanner}
          width={280}
        >
          バーコード読み取り
        </Button>
        {openScanner && (
          <Button onClick={handleCloseScanner} background="sub">
            閉じる
          </Button>
        )}
      </div>
      <div css={scannerWrap}>
        {openScanner ? (
          <Scanner setValue={setCode} />
        ) : (
          <p>「バーコード読み取り」を押下するとカメラが起動します</p>
        )}
      </div>
    </div>
  );
};
