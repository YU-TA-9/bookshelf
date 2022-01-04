import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Button } from '../atoms/Button';
import { TextForm } from '../atoms/TextForm';
import { MainTemplate } from '../templates/MainTemplate';

export const BookRegister = () => {
  const [isbn, setIsbn] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value);
  };

  const handleRegister = async () => {
    const response = await api.booksControllerCreateBook({ isbn: isbn });
    if (response.status !== 201) {
      alert('Failed!!');
    } else {
      alert('Success!');
    }
  };

  return (
    <MainTemplate title="書籍登録">
      <div>
        <TextForm value={isbn} onChange={handleChange} />
        <Button label="ISBNコードで登録" onClick={handleRegister} />
      </div>
    </MainTemplate>
  );
};
