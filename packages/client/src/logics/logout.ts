import { api } from '../api/apiFactory';

export const handleLogout = async () => {
  try {
    await api.authControllerLogout();
    localStorage.clear();
    window.location.reload();
  } catch (e) {}
};
