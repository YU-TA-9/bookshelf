import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { api } from '../api/apiFactory';
import { userState } from '../states/atoms/user';

export const BookshelfRecoilRoot = () => {
  // TODO:
  //const require_loading = useRecoilValue(RequireLoadingFromBackendState);
  const setUser = useSetRecoilState(userState);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    InitialLoading();
  }, []);

  const InitialLoading = async () => {
    try {
      const userPromise = async () => {
        const { data } = await api.usersControllerGetUser();
        setUser(data);
      };

      await Promise.all([userPromise()]);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: ローディングアニメーションを貼りたい
  return loading ? <React.Fragment /> : <Outlet />;
};
