import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { loginUser } from '../features';
import { ROUTES } from '../utils';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!user && storedUser) {
      dispatch(
        loginUser({
          data: JSON.parse(storedUser),
          rememberMe: !!localStorage.getItem('user'),
        })
      );
    } else if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate, dispatch]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
