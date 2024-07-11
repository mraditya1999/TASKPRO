import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Avatar, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoginForm } from '../components';

const LoginPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};
export default LoginPage;
