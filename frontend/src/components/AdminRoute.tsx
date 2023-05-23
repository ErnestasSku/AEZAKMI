import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user?.role !== 'ADMIN' ? <Navigate to="/" /> : children;
};

export const withAdminRoute = (Component: React.FC) => {
  return () => (
    <AdminRoute>
      <Component />
    </AdminRoute>
  );
};
