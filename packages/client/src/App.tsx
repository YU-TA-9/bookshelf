import { Global } from '@emotion/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Top } from './components/pages/Top';
import { globalStyle } from './styles/globalStyle';
import { BookDetail } from './components/pages/BookDetail';
import { Login } from './components/pages/Login';
import { WithAuth } from './logics/WithAuth';
import { SignUp } from './components/pages/SignUp';
import { BookshelfRecoilRoot } from './logics/RecoilRoot';
import { RecoilRoot } from 'recoil';
import { Profile } from './components/pages/Profile';
import { BookCategory } from './components/pages/BookCategory';
import { NotificationProvider } from './logics/NotificationProvider';

export const App = () => {
  return (
    <NotificationProvider>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route element={<WithAuth />}>
              <Route element={<BookshelfRecoilRoot />}>
                <Route path="/" element={<Top />}></Route>
                <Route path="/:id" element={<BookDetail />}></Route>
                <Route path="/category" element={<BookCategory />}></Route>
                <Route path="/user/profile" element={<Profile />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </NotificationProvider>
  );
};
