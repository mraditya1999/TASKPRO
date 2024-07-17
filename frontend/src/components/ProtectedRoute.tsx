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
  const user = useAppSelector((state) => state.user.user); // Simplified access

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');

    // If user is not present, check the stored user
    if (!user && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginUser({
          ...parsedUser,
          rememberMe: !!localStorage.getItem('user'),
        })
      );
    }

    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate, dispatch]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
