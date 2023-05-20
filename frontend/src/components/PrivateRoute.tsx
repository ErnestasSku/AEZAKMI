import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const withPrivateRoute = (Component: React.FC) => {
  return () => (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};
