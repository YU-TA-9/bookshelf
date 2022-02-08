import { Navigate, Outlet } from 'react-router-dom';

export const WithAuth = () => {
  const userInfo = localStorage.getItem('user_info');

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};
