import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/home" /> : children;
};

export const withPublicRoute = (Component: React.FC) => {
  return () => (
    <PublicRoute>
      <Component />
    </PublicRoute>
  );
};
