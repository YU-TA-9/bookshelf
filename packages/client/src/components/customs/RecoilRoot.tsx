import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { api } from '../../api/apiFactory';
import { booksState } from '../../states/atoms/book';
import { categoriesState } from '../../states/atoms/category';
import { requireLoadingState } from '../../states/atoms/loading';
import { userState } from '../../states/atoms/user';

export const BookshelfRecoilRoot = () => {
  const requireLoading = useRecoilValue(requireLoadingState);
  const setUser = useSetRecoilState(userState);
  const setBooks = useSetRecoilState(booksState);
  const setCategories = useSetRecoilState(categoriesState);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    InitialLoading();
  }, [requireLoading]);

  const InitialLoading = async () => {
    try {
      const userPromise = async () => {
        const { data } = await api.usersControllerGetUser();
        setUser(data);
      };

      const booksPromise = async () => {
        const { data } = await api.booksControllerGetBookList();
        setBooks(data);
      };

      const categoriesPromise = async () => {
        const { data } = await api.categoriesControllerGetCategories();
        setCategories(data);
      };

      await Promise.all([userPromise(), booksPromise(), categoriesPromise()]);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: ローディングアニメーションを貼りたい
  return loading ? <React.Fragment /> : <Outlet />;
};
