import * as React from 'react';
import { api } from '../../api/apiFactory';
import { useRecoilState } from 'recoil';
import { MainTemplate } from '../templates/MainTemplate';
import { Button } from '../atoms/Button';
import { CategoryTable } from '../organisms/CategoryTable';
import { css } from '@emotion/react';
import { categoriesState } from '../../states/atoms/category';
import { DEFAULT_CATEGORY_COLOR } from '../../constants/category';

const tableWrap = css`
  margin-bottom: 16px;
`;

export const BookCategory = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.categoriesControllerGetCategories();
      setCategories(data);
    })();
  }, []);

  const handleAdd = async () => {
    const { data } = await api.categoriesControllerCreateCategory({
      name: `カテゴリー${categories.length + 1}`,
      color: DEFAULT_CATEGORY_COLOR,
    });
    setCategories([...categories, data]);
  };

  return (
    <MainTemplate title="カテゴリー">
      <div css={tableWrap}>
        <CategoryTable categories={categories} setCategories={setCategories} />
      </div>
      <Button onClick={handleAdd} width={124}>
        追加
      </Button>
    </MainTemplate>
  );
};
