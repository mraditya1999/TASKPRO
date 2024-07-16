import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { logoutUser } from '../features';
import { CustomAppBar, CustomDrawer, Main } from '../components';

const LayoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleLogout={handleLogout}
      />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default LayoutPage;
