import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Category } from '../../api/generated';
import { MainTemplate } from '../templates/MainTemplate';
import { Button } from '../atoms/Button';
import { CategoryTable } from '../organisms/CategoryTable';
import { css } from '@emotion/react';

const tableWrap = css`
  margin-bottom: 16px;
`;

export const BookCategory = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.categoriesControllerGetCategories();
      setCategories(data);
    })();
  }, []);

  const handleAdd = async () => {
    const { data } = await api.categoriesControllerCreateCategory({
      name: `カテゴリー${categories.length + 1}`,
      color: '#3da9fc', //default
    });
    setCategories([...categories, data]);
  };

  return (
    <MainTemplate title="カテゴリー">
      <div css={tableWrap}>
        <CategoryTable categories={categories} setCategories={setCategories} />
      </div>
      <Button label="追加" onClick={handleAdd} width={124} />
    </MainTemplate>
  );
};
