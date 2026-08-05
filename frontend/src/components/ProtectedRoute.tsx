import { Navigate, useLocation } from 'react-router-dom';
import { getStoredAuth } from '../lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const session = getStoredAuth();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
