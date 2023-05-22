import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/context';
import { login } from '../api/authApi';

export const useAuth = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);

  const loginUser = useCallback(async (username: string, password: string) => {
    const { data } = await login({ username, password });
    if (data) {
      setToken(data.token);
      setUser({
        username: data.username,
        id: data.id,
        role: data.role,
      });
    }
  }, []);

  const logoutUser = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return {
    isLoggedIn: !!token,
    login: loginUser,
    logout: logoutUser,
    user,
  };
};
