import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { data: user } = useAppSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
