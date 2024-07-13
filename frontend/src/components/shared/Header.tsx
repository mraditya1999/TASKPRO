import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features';
import { useAppDispatch } from '../../hooks';
import { ROUTES } from '../../utils';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div>
      <h1>Header</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
export default Header;
