import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/context';
import { login } from '../api/authApi';

export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  const loginUser = useCallback(async (username: string, password: string) => {
    const response = await login({ username, password });
    if (response.data) {
      setToken(response.data);
    }
  }, []);

  const logoutUser = useCallback(() => {
    setToken(null);
  }, []);

  return {
    token,
    isLoggedIn: !!token,
    setToken,
    login: loginUser,
    logout: logoutUser,
  };
};
