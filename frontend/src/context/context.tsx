import { createContext, useEffect, useMemo, useState } from 'react';
import { LoggedInUser } from '../api';
import { noop } from 'lodash';

interface IAuthContext {
  token: string | null;
  setToken: (token: string | null) => void;
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: noop,
  user: null,
  setUser: noop,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [user, setUser] = useState<LoggedInUser | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const memoValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token, setToken, user, setUser]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
