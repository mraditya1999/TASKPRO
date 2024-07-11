import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { RegisterForm } from '../components';
import { Box } from '@mui/material';

const RegisterPage = () => {
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
          Register
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
