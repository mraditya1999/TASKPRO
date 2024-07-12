import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../app/features/user/userSlice';
import { useAppDispatch } from '../../app/hooks';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div>
      <h1>Header</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
export default Header;
